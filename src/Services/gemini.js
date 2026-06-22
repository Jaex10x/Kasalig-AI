import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai = null;
if (apiKey) {
    ai = new GoogleGenAI({
        apiKey: apiKey,
    });
}

const SYSTEM_INSTRUCTION = `You are Kasalig AI, a helpful and knowledgeable Government Services AI Assistant for the Philippines. 
Your role is to help Filipino citizens navigate government transactions, requirements, processes, and IDs.

Guidelines:
- Provide detailed, accurate, and up-to-date information about Philippine government services
- Include specific requirements, fees, processing times, and step-by-step instructions when applicable
- Be warm, professional, and use a mix of English (you may include common Filipino terms when appropriate)
- Format your responses clearly with bullet points, numbered lists, and bold text for emphasis
- Always remind users to verify information with the official government agency
- Cover services like: National ID (PhilSys), PSA certificates, NBI clearance, passport (DFA), driver's license (LTO), business registration (DTI/SEC/BIR), SSS, PhilHealth, Pag-IBIG, and more
- If you don't know something, say so honestly and suggest where to find the information`;

export async function askGemini(prompt) {
    if (!ai) {
        return "⚠️ Gemini API is not configured. Please add your API key to the .env file as VITE_GEMINI_API_KEY and restart the dev server.";
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API Error:", error);
        
        if (error.message?.includes("API key")) {
            return "⚠️ API key issue. Please make sure your VITE_GEMINI_API_KEY is set correctly in the .env file and restart the dev server.";
        }
        
        return "I'm sorry, I encountered an error processing your request. Please try again in a moment.";
    }
}