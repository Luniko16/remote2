import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Get API key from environment
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Warning: No Google AI API key found. AI features will not work.');
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
