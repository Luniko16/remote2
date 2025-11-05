
'use server';

/**
 * @fileOverview AI agent to enhance work experience descriptions.
 *
 * - enhanceExperienceDescription - A function that enhances a given work experience description.
 * - EnhanceExperienceDescriptionInput - The input type for the enhanceExperienceDescription function.
 * - EnhanceExperienceDescriptionOutput - The return type for the enhanceExperienceDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceExperienceDescriptionInputSchema = z.object({
  jobTitle: z.string().describe('The job title for the work experience.'),
  description: z.string().describe('The current work experience description.'),
});
export type EnhanceExperienceDescriptionInput = z.infer<typeof EnhanceExperienceDescriptionInputSchema>;

const EnhanceExperienceDescriptionOutputSchema = z.object({
  enhancedDescription: z.string().describe('The enhanced work experience description as a series of bullet points.'),
});
export type EnhanceExperienceDescriptionOutput = z.infer<typeof EnhanceExperienceDescriptionOutputSchema>;

export async function enhanceExperienceDescription(
  input: EnhanceExperienceDescriptionInput
): Promise<EnhanceExperienceDescriptionOutput> {
  return enhanceExperienceDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceExperienceDescriptionPrompt',
  input: {schema: EnhanceExperienceDescriptionInputSchema},
  output: {schema: EnhanceExperienceDescriptionOutputSchema},
  prompt: `You are an expert resume writer. Rewrite the following work experience description for a {{{jobTitle}}} into 3-4 very concise, professional bullet points. Use fewer words and focus on impact.
- Start each point with a strong action verb.
- Focus on quantifiable achievements and results (e.g., "Increased sales by 15%", "Reduced costs by $5,000").
- Use the STAR (Situation, Task, Action, Result) method as a guide.
- Do not use personal pronouns like "I" or "my".
- Return only the bullet points, with each point starting with a hyphen (-) or a bullet character (•).

Description to enhance:
"{{{description}}}"`,
});

const enhanceExperienceDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceExperienceDescriptionFlow',
    inputSchema: EnhanceExperienceDescriptionInputSchema,
    outputSchema: EnhanceExperienceDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {enhancedDescription: output!.enhancedDescription};
  }
);
