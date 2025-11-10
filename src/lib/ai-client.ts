'use client';

import { generateAiSummary, type GenerateAiSummaryInput, type GenerateAiSummaryOutput } from '@/ai/flows/generate-ai-summary';
import { enhanceExperienceDescription, type EnhanceExperienceDescriptionInput, type EnhanceExperienceDescriptionOutput } from '@/ai/flows/enhance-experience-description';

/**
 * Client-side wrapper for AI functions that automatically includes the API key
 */
export class AIClient {
  private getApiKey(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('google_ai_api_key');
  }

  async generateSummary(input: Omit<GenerateAiSummaryInput, 'apiKey'>): Promise<GenerateAiSummaryOutput> {
    const apiKey = this.getApiKey();
    console.log('AI Client - API Key available:', !!apiKey);
    console.log('AI Client - API Key length:', apiKey?.length);
    console.log('AI Client - API Key starts with AIza:', apiKey?.startsWith('AIza'));
    
    return generateAiSummary({
      ...input,
      apiKey: apiKey || undefined
    });
  }

  async enhanceExperience(input: Omit<EnhanceExperienceDescriptionInput, 'apiKey'>): Promise<EnhanceExperienceDescriptionOutput> {
    const apiKey = this.getApiKey();
    return enhanceExperienceDescription({
      ...input,
      apiKey: apiKey || undefined
    });
  }

  hasApiKey(): boolean {
    const key = this.getApiKey();
    return !!(key && key.length > 10 && key.startsWith('AIza'));
  }
}

export const aiClient = new AIClient();