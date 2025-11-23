import { GoogleGenAI } from "@google/genai";
import { BookType } from '../types';

// Initialize the Gemini API client
// Note: process.env.API_KEY is assumed to be available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBookStream = async (
  prompt: string,
  type: BookType,
  onChunk: (text: string) => void
): Promise<void> => {
  let systemInstruction = "You are a world-class author and researcher.";
  let lengthGuidance = "";

  switch (type) {
    case BookType.SHORT:
      lengthGuidance = "Write a compelling short story (approx 1000 words). Focus on a single impactful event or character arc.";
      break;
    case BookType.MEDIUM:
      lengthGuidance = "Write a novella (approx 3000-5000 words). Develop characters deeply and have multiple plot points.";
      break;
    case BookType.LONG:
      lengthGuidance = "Write a comprehensive book outline and the first 3 detailed chapters of a novel (aim for depth and extensive detail).";
      break;
    case BookType.RESEARCH:
      systemInstruction = "You are an academic researcher. Use formal tone, structure with Abstract, Introduction, Methodology, Analysis, and Conclusion.";
      lengthGuidance = "Write a detailed research paper or technical book chapter based on the prompt. Include citations (simulated) and structured arguments.";
      break;
  }

  const fullPrompt = `
    Task: ${lengthGuidance}
    
    Topic/Prompt: "${prompt}"
    
    Formatting Rules:
    - Use Markdown for formatting.
    - Use # for the Title.
    - Use ## for Chapter Titles.
    - Use bold/italics for emphasis.
    - Ensure smooth transitions between paragraphs.
    - Do not include any 'Here is your book' conversational filler. Start directly with the content.
  `;

  try {
    const streamResult = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash', // Using the requested efficient model
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        // Limit tokens slightly to ensure responsiveness, though flash handles large context well.
        // We rely on the model's natural stop or max output of the model.
      }
    });

    for await (const chunk of streamResult) {
      const chunkText = chunk.text;
      if (chunkText) {
        onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
