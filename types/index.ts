export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  word?: string;
  definition?: WordDefinition;
}

export interface WordDefinition {
  word: string;
  phonetic?: string;
  meanings: Meaning[];
  origin?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}