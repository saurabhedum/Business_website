
import { GoogleGenAI, Type } from "@google/genai";
import { AIPromptResult } from "../types";

export const generateAutomationProposal = async (userPrompt: string): Promise<AIPromptResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Propose an automation solution for this request: "${userPrompt}". 
    Provide a realistic, professional, and detailed plan.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedTime: { type: Type.STRING },
          costEstimate: { type: Type.STRING }
        },
        required: ["title", "summary", "steps", "estimatedTime", "costEstimate"]
      }
    }
  });

  const text = response.text || "";
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse AI response:", text);
    throw new Error("Invalid AI response format");
  }
};
