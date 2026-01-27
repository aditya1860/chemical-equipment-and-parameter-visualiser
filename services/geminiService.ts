
import { GoogleGenAI, Type } from "@google/genai";
import { EquipmentItem, AIInsight } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!apiKey) {
  console.warn('⚠️ Warning: VITE_GEMINI_API_KEY environment variable is not set. AI insights will not be available.');
}

const genAI = new GoogleGenAI({ apiKey: apiKey || '' });

export const getAIInsights = async (data: EquipmentItem[]): Promise<AIInsight[]> => {
  if (!apiKey) {
    console.error('❌ Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env.local file.');
    return [];
  }

  if (!data || data.length === 0) {
    console.warn('No equipment data provided for analysis.');
    return [];
  }

  try {
    const summaryStr = data.slice(0, 15).map(item => 
      `${item.name} (${item.type}): Flow=${item.flowrate}, Press=${item.pressure}, Temp=${item.temperature}`
    ).join('; ');

    const prompt = `
      As a chemical process engineer, analyze the following chemical equipment data summary:
      ${summaryStr}
      
      Identify 3 critical operational insights. For each insight, provide:
      1. A short title.
      2. Detailed observation.
      3. A technical recommendation.
      4. Risk level (Low, Medium, or High).
    `;

    const response = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              observation: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
            },
            required: ['title', 'observation', 'recommendation', 'riskLevel']
          }
        }
      }
    });

    const insights = JSON.parse(response.text || '[]');
    console.log('✅ Successfully fetched AI insights:', insights);
    return insights;
  } catch (error) {
    console.error("❌ Error fetching Gemini insights:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return [];
  }
};
