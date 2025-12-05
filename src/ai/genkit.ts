import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Get API key from environment with fallback
const apiKey = process.env.GOOGLE_GENAI_API_KEY || 
               process.env.GOOGLE_API_KEY || 
               process.env.GEMINI_API_KEY ||
               process.env.GOOGLE_GENAI_API_KEY_BACKUP ||
               'AIzaSyAMey9HpHfweRLO62_BOAYJewKqO20Qe54'; // Fallback key from .env.local

console.log('Genkit - API Key available:', !!apiKey);
console.log('Genkit - API Key length:', apiKey?.length);

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
