
'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '@/lib/types';
import { Sparkles, BarChartBig, Loader2, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiClient } from '@/lib/ai-client';
import { analyzeJobDescription } from '@/ai/flows/analyze-job-description';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useLanguage } from '@/context/language-context';

export function SummaryStep() {
  const { control, setValue, getValues } = useFormContext<ResumeData>();
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    const resumeData = getValues();
    try {
      const result = await aiClient.generateSummary({
        jobTitle: resumeData.personal.jobTitle,
        skills: resumeData.skills.join(', '),
        experience: resumeData.experience[0]?.jobRole || '',
        language: language
      });
      setValue('summary', result.summary, { shouldValidate: true });
      toast({
        title: t.toast.success,
        description: t.toast.summarySuccess,
      });
    } catch (error) {
      console.error('AI summary generation error:', error);
      toast({
        title: t.toast.error,
        description: t.toast.summaryError,
        variant: 'destructive',
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleAnalyzeDescription = async () => {
    if (!jobDescription) {
      toast({
        title: t.toast.inputRequired,
        description: 'Please paste a job description to analyze.',
        variant: 'destructive',
      });
      return;
    }
    setIsAnalysisLoading(true);
    setAnalysisResult('');
    const resumeData = getValues();
    try {
      const result = await analyzeJobDescription({
        jobDescription,
        resumeSkills: resumeData.skills,
      });

      const sanitizedResult = DOMPurify.sanitize(result.analysisResult, {
        USE_PROFILES: { html: true },
      });

      setAnalysisResult(sanitizedResult);
      toast({
        title: t.toast.success,
        description: t.toast.analysisSuccess,
      });
    } catch (error) {
      console.error('AI analysis error:', error);
      toast({
        title: t.toast.error,
        description: t.toast.analysisError,
        variant: 'destructive',
      });
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="professionalSummary">{t.summary.professionalSummary}</Label>
            <FormControl>
              <Textarea
                id="professionalSummary"
                {...field}
                rows={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button onClick={handleGenerateSummary} disabled={isSummaryLoading}>
        {isSummaryLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        {t.summary.generate}
      </Button>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChartBig />
            {t.summary.analysisTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobDescription">{t.summary.analysisLabel}</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleAnalyzeDescription} disabled={isAnalysisLoading} variant="secondary">
            {isAnalysisLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BarChartBig className="mr-2 h-4 w-4" />
            )}
            {t.summary.analyze}
          </Button>
          {analysisResult && (
            <Card className="mt-4">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Bot /> {t.summary.aiAnalysis}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: analysisResult.replace(/\n/g, '<br />') }} />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
