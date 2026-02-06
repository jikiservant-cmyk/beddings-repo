
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

export const getStylistResponse = async (history: ChatMessage[], message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const SYSTEM_INSTRUCTION = `
      You are the Lumina Linens "Sleep Stylist". Your goal is to help customers find the perfect bedding based on their sleep habits and aesthetic preferences. 
      Knowledge Base:
      - Sheets: Cotton (crisp), Linen (breathable/textured), Sateen (silky/warm).
      - Duvets: Down (warm/lofty), Down Alternative (hypoallergenic), Linen (cool).
      - Issues: Hot sleepers should choose Linen or Eucalyptus. Cold sleepers should choose Sateen or Down.
      - Aesthetics: Minimalist (White/Grey), Coastal (Sage/Blue), Luxury (Champagne/Gold).

      Rules:
      1. Be warm, professional, and sophisticated.
      2. If the user mentions a specific sleep problem (sweating, allergies), address it with material science.
      3. Recommend specific categories from Lumina Linens: Sheets, Duvets, Pillows, Blankets.
      4. Keep responses concise but helpful.
      5. Do not invent products outside the category of bedding.
    `;

    // Convert history into the format expected by the SDK
    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...contents,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm dreaming of a better answer... could you try that again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble connecting to my sleep knowledge right now. Please try again in a moment.";
  }
};
