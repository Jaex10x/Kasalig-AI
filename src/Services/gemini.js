import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai = null;
if (apiKey) {
    ai = new GoogleGenAI({
        apiKey: apiKey,
    });
}

const SYSTEM_INSTRUCTION = `You are Kasalig AI, a helpful and knowledgeable Government Services AI Assistant for the Philippines, specifically focused on the Province of Cebu. 
Your role is to help citizens navigate and apply for business permits (averages 3 days, fee ₱530.00) and civil registry corrections (3–8 months processing time, fee ₱1,000.00 – ₱3,000.00) across all 53 municipalities of Cebu, understand requirements, fees, processing times, and use the Municipality Tracker to check processing speeds and delays.

Guidelines:
- Provide detailed, accurate, and up-to-date information about business permits and civil registry corrections in Cebu Province
- Include specific requirements, fees, processing times, and step-by-step instructions when applicable
- Be warm, professional, and use a mix of English and Filipino (you may include common Cebuano terms like 'Magandang araw' or 'Maayong adlaw' when appropriate)
- Format your responses clearly with bullet points, numbered lists, and bold text for emphasis
- Cover services like: Barangay Clearance, DTI/SEC registration, Cedula, Mayor's Permit / Business Permit, birth/marriage/death certificate correction (RA 9048/10172), and tracking municipality performance
- Always remind users to verify information with the official municipality office
- Keep responses conversational and friendly, like a live chat agent would`;

let conversationHistory = [];

/**
 * Reset the conversation history (e.g., when user starts a new session)
 */
export function resetConversation() {
    conversationHistory = [];
}

/**
 * Get the current conversation history
 */
export function getConversationHistory() {
    return [...conversationHistory];
}

/**
 * Stream a response from Gemini, calling onChunk for each piece of text as it arrives.
 * Returns the full accumulated response text.
 * 
 * @param {string} prompt - The user's message
 * @param {function} onChunk - Callback called with (accumulatedText) on each new chunk
 * @returns {Promise<string>} The complete response text
 */
export async function askGeminiStream(prompt, onChunk) {
    if (!ai) {
        const fallbackMsg = "⚠️ Gemini API is not configured. Please add your API key to the .env file as VITE_GEMINI_API_KEY and restart the dev server.";
        if (onChunk) onChunk(fallbackMsg);
        return fallbackMsg;
    }

    try {

        conversationHistory.push({
            role: "user",
            parts: [{ text: prompt }],
        });


        const contents = conversationHistory.map(msg => ({
            role: msg.role,
            parts: msg.parts,
        }));

        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });

        let fullText = "";

        for await (const chunk of response) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullText += chunkText;
                if (onChunk) {
                    onChunk(fullText);
                }
            }
        }


        conversationHistory.push({
            role: "model",
            parts: [{ text: fullText }],
        });


        if (conversationHistory.length > 40) {
            conversationHistory = conversationHistory.slice(-40);
        }

        return fullText;
    } catch (error) {
        console.error("Gemini API Error:", error);


        conversationHistory.pop();

        if (error.message?.includes("API key")) {
            const errMsg = "⚠️ API key issue. Please make sure your VITE_GEMINI_API_KEY is set correctly in the .env file and restart the dev server.";
            if (onChunk) onChunk(errMsg);
            return errMsg;
        }

        const errMsg = "I'm sorry, I encountered an error processing your request. Please try again in a moment.";
        if (onChunk) onChunk(errMsg);
        return errMsg;
    }
}

/**
 * Non-streaming fallback (kept for backward compatibility)
 */
export async function askGemini(prompt) {
    return askGeminiStream(prompt, null);
}