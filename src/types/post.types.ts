export interface TextEntry {
  id: number;
  content: string;
  tags: string;
}

export type EditMode = 'CONTENT' | 'TAGS' | null;