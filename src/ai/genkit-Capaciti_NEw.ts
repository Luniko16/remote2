import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Create a function to get AI instance with dynamic API key
export function createAI(apiKey?: string) {
  const key = apiKey || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENAI_API_KEY_BACKUP;
  const aiEnabled = process.env.ENABLE_AI_FEATURES !== 'false' && !!key;

  console.log('CreateAI - API Key provided:', !!apiKey);
  console.log('CreateAI - Final key available:', !!key);
  console.log('CreateAI - AI Enabled:', aiEnabled);

  if (!aiEnabled || !key) {
    console.log('CreateAI - Returning AI instance without plugins');
    return genkit({
      plugins: [],
      model: 'googleai/gemini-1.5-flash',
    });
  }

  // Set the API key in environment for this instance
  if (key && typeof process !== 'undefined') {
    process.env.GOOGLE_GENAI_API_KEY = key;
  }

  console.log('CreateAI - Creating AI instance with googleAI plugin');
  return genkit({
    plugins: [googleAI()], // Let it use the environment variable
    model: 'googleai/gemini-1.5-flash',
  });
}

// Default AI instance for backward compatibility
export const ai = createAI();
