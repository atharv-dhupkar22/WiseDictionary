import { WordDefinition } from '../types';

// Fallback dictionary for common words when API is unavailable
const fallbackDatabase: Record<string, WordDefinition> = {
  hello: {
    word: "hello",
    phonetic: "/həˈloʊ/",
    meanings: [
      {
        partOfSpeech: "exclamation",
        definitions: [
          {
            definition: "A friendly greeting used when meeting someone or starting a conversation.",
            example: "Hello there! How's your day going?",
            synonyms: ["hi", "hey", "greetings", "howdy"]
          }
        ]
      }
    ]
  },
  beautiful: {
    word: "beautiful",
    phonetic: "/ˈbjuːtɪfəl/",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Having qualities that give great pleasure or satisfaction to see, hear, or think about.",
            example: "The sunset painted a beautiful picture across the sky.",
            synonyms: ["gorgeous", "stunning", "lovely", "attractive", "magnificent"]
          }
        ]
      }
    ]
  },
  serendipity: {
    word: "serendipity",
    phonetic: "/ˌsɛrənˈdɪpɪti/",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The pleasant surprise of finding something good or useful while not specifically searching for it.",
            example: "Meeting my future business partner at that coffee shop was pure serendipity.",
            synonyms: ["chance", "luck", "fortune", "coincidence"]
          }
        ]
      }
    ]
  }
};

// Transform API response to our format
const transformApiResponse = (apiData: any): WordDefinition => {
  const word = apiData.word || '';
  const phonetic = apiData.phonetic || apiData.phonetics?.[0]?.text || '';
  
  const meanings = apiData.meanings?.map((meaning: any) => ({
    partOfSpeech: meaning.partOfSpeech || 'unknown',
    definitions: meaning.definitions?.slice(0, 3).map((def: any) => ({
      definition: def.definition || '',
      example: def.example || undefined,
      synonyms: def.synonyms?.slice(0, 5) || [],
      antonyms: def.antonyms?.slice(0, 3) || []
    })) || []
  })) || [];

  return {
    word,
    phonetic,
    meanings: meanings.slice(0, 3) // Limit to 3 meanings for better UX
  };
};

export const searchWord = async (word: string): Promise<WordDefinition | null> => {
  const cleanWord = word.toLowerCase().trim();
  
  // Check fallback database first for instant response on common words
  if (fallbackDatabase[cleanWord]) {
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for UX
    return fallbackDatabase[cleanWord];
  }

  try {
    // Try Free Dictionary API first
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return transformApiResponse(data[0]);
      }
    }

    // If Free Dictionary API fails, try WordsAPI as backup
    try {
      const wordsApiResponse = await fetch(`https://wordsapiv1.p.rapidapi.com/words/${encodeURIComponent(cleanWord)}`, {
        headers: {
          'X-RapidAPI-Key': 'demo', // Using demo key - users would need their own
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
      });

      if (wordsApiResponse.ok) {
        const wordsData = await wordsApiResponse.json();
        if (wordsData && wordsData.results) {
          return {
            word: wordsData.word || cleanWord,
            phonetic: wordsData.pronunciation?.all || '',
            meanings: wordsData.results.slice(0, 3).map((result: any) => ({
              partOfSpeech: result.partOfSpeech || 'unknown',
              definitions: [{
                definition: result.definition || '',
                example: result.examples?.[0] || undefined,
                synonyms: result.synonyms?.slice(0, 5) || [],
                antonyms: result.antonyms?.slice(0, 3) || []
              }]
            }))
          };
        }
      }
    } catch (wordsApiError) {
      console.log('WordsAPI also failed, using fallback');
    }

    // If both APIs fail, return null to show "word not found" message
    return null;

  } catch (error) {
    console.error('Dictionary API error:', error);
    
    // Return a helpful error response
    return {
      word: cleanWord,
      phonetic: '',
      meanings: [{
        partOfSpeech: 'note',
        definitions: [{
          definition: `I'm having trouble connecting to the dictionary service right now. Please check your internet connection and try again.`,
          example: `You searched for: "${cleanWord}"`,
          synonyms: []
        }]
      }]
    };
  }
};

// Enhanced search with multiple attempts and better error handling
export const searchWordWithRetry = async (word: string, retries: number = 2): Promise<WordDefinition | null> => {
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await searchWord(word);
      if (result) return result;
    } catch (error) {
      if (i === retries) {
        console.error('All dictionary API attempts failed:', error);
        return {
          word: word.toLowerCase().trim(),
          phonetic: '',
          meanings: [{
            partOfSpeech: 'error',
            definitions: [{
              definition: `Sorry, I couldn't find "${word}" in any of my dictionary sources. This might be due to connectivity issues or the word might not be in my database.`,
              example: 'Try checking the spelling or searching for a different word.',
              synonyms: []
            }]
          }]
        };
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return null;
};