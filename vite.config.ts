import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // لا نحتاج لـ loadEnv هنا لأننا ندخل المفتاح مباشرة في الكود
    // ولكن نتركه في حالة وجود استخدامات أخرى.
    const env = loadEnv(mode, '.', '');
    
    return {
        // 1. إضافة المسار الأساسي (Base Path) لـ GitHub Pages.
        // يجب أن يتطابق 'chatbot-mohamed' مع اسم مستودعك.
        base: '/chatbot-mohamed/', 

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        
        // 2. إزالة الإعدادات المعقدة للمتغيرات التي كانت تسبب خطأ القراءة
        // (Vite يتعامل مع المفتاح مباشرة الآن في services/geminiService.ts)
        define: {
             // إزالة process.env.API_KEY وغيرها
        },
        
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});