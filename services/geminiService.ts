import { GoogleGenAI, Chat } from "@google/genai";

// تم إدخال المفتاح مباشرة لحل مشكلة قراءة المتغيرات البيئية
const API_KEY = "AIzaSyCCChhaN2oTSf50qcWtLBFJSH-h2DZ_-M4"; 

// يمكن إزالة شرط الخطأ هذا الآن لأنه سيتم تعيين المفتاح مباشرة
// if (!API_KEY) {
//     throw new Error("Missing VITE_GEMINI_API_KEY environment variable.");
// }

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = ai.models['gemini-2.5-flash'];

export const createChatSession = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "أنت مساعد ذكاء اصطناعي متطور واسمك محمد. مهمتك هي مساعدة المستخدمين بإجابات دقيقة ومفيدة. كن مهذباً وودوداً في جميع تفاعلاتك. تحدث باللغة العربية.",
        },
    });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
    try {
        const result = await chat.sendMessage({ message: message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "عذراً، حدث خطأ أثناء محاولة التواصل مع الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.";
    }
};