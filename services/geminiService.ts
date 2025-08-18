
import { GoogleGenAI } from "@google/genai";
import { GameMode } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function getTruthOrDare(mode: GameMode, type: 'truth' | 'dare', playerName: string): Promise<string> {
  const prompt = `
    You are a fun party game host for a game of "Truth or Dare".
    Generate one single question or action.
    Game Mode: "${mode}"
    Challenge Type: "${type}"
    It is ${playerName}'s turn.
    The response must be creative, engaging, and fit the specified game mode.
    Do not include any introductory text, quotation marks, or any extra formatting.
    Just provide the truth question or the dare action directly as a single line of text.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 1,
          topP: 0.95,
          topK: 64
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return "The AI is thinking of a really good one... or it failed. Do 10 jumping jacks!";
  }
}
