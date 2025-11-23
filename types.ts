export enum BookType {
  SHORT = 'book_small',
  MEDIUM = 'book_medium',
  LONG = 'book_long',
  RESEARCH = 'research_long',
}

export const BookTypeLabels: Record<BookType, string> = {
  [BookType.SHORT]: 'Small Book',
  [BookType.MEDIUM]: 'Medium Book',
  [BookType.LONG]: 'Long Book',
  [BookType.RESEARCH]: 'Research Paper',
};

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface BookGenerationState {
  isGenerating: boolean;
  progress: number; // 0-100
  pdfUrl: string | null;
  error: string | null;
}