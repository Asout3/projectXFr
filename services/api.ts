import axios from "axios";
import { BookType } from "../types";

const apiClient = axios.create({
  baseURL: "https://projectx-production-d880.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiMap: Record<BookType, string> = {
  [BookType.SHORT]: "/api/generateBookSmall",
  [BookType.MEDIUM]: "/api/generateBookMed",
  [BookType.LONG]: "/api/generateBookLong",
  [BookType.RESEARCH]: "/api/generateResearchPaperLong",
};

export const generateBookPDF = async (
  prompt: string,
  type: BookType,
  userId: string,
  onProgress: (percent: number) => void
): Promise<{ url: string; fileName: string }> => {
  const endpoint = apiMap[type];

  try {
    const res = await apiClient.post(
      endpoint,
      { prompt, userId },
      {
        responseType: "blob",
        onDownloadProgress: (e) => {
          const total = e.total ?? 10_000_000; // Fallback estimate if total undefined
          const percent = Math.min(99, Math.round((e.loaded * 100) / total));
          onProgress(percent);
        },
      }
    );

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const fileName = `${prompt.slice(0, 20).replace(/\s+/g, "_") || "book"}.pdf`;
    
    onProgress(100);
    return { url, fileName };
  } catch (err) {
    console.error("PDF Generation Error:", err);
    throw err;
  }
};

export const cancelGeneration = async (userId: string): Promise<void> => {
  try {
    await apiClient.post("/api/cancelGeneration", { userId });
  } catch (err) {
    console.error("Cancel Request Failed:", err);
  }
};