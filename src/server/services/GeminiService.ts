import { GoogleGenAI } from "@google/genai";

// Use the key provided by the user, but prioritize environment variable
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDzDDt1DjwZBN6Ei1KHuEoszOvSLcE6OiE";

export const ai = new GoogleGenAI({
  apiKey: API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function generateAgentJSON(prompt: string): Promise<any> {
  if (!API_KEY || API_KEY.includes("YOUR_")) {
    throw new Error("Gemini API Key is missing or invalid. Please check the Secrets panel.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("The model returned an empty response.");
    }

    return JSON.parse(text);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to communicate with Gemini API");
  }
}
