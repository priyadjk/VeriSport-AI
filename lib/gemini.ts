'use client';

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function analyzeMediaAuthenticity(mediaDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Digital Forensics AI for VeriSport AI. Analyze the following sports media clip description for potential deepfake markers or temporal inconsistencies: "${mediaDescription}". 
      Return a JSON object with:
      - authenticityScore (0-100)
      - markers (array of strings, e.g. "Temporal flicker", "Audio-lip sync error")
      - status ("Verified", "Suspicious", "Deepfake")
      - summary (brief explanation)`,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Analysis failed:", error);
    return null;
  }
}
