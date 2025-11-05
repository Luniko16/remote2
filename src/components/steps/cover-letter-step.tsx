
'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { ResumeData } from '@/lib/types';
import { Sparkles, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCoverLetter } from '@/ai/flows/generate-cover-letter';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { saveAs } from 'file-saver';
import { useLanguage } from '@/context/language-context';

export function CoverLetterStep() {
  const { control, setValue, getValues } = useFormContext<ResumeData>();
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleGenerateCoverLetter = async () => {
    if (!companyName) {
      toast({
        title: t.toast.error,
        description: t.coverLetter.companyNameError,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const resumeData = getValues();
    try {
      const result = await generateCoverLetter({
        companyName,
        jobTitle: resumeData.personal.jobTitle,
        skills: resumeData.skills,
        summary: resumeData.summary,
        experience: resumeData.experience.map(exp => exp.description).join('\n\n'),
        language: language,
      });
      setValue('coverLetter', result.coverLetter, { shouldValidate: true });
      toast({
        title: t.toast.success,
        description: t.toast.coverLetterSuccess,
      });
    } catch (error) {
      console.error('AI cover letter generation error:', error);
      toast({
        title: t.toast.error,
        description: t.toast.coverLetterError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadCoverLetter = () => {
    const coverLetterText = getValues('coverLetter');
    if (coverLetterText) {
      const blob = new Blob([coverLetterText], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'cover-letter.txt');
    } else {
      toast({
        title: t.toast.error,
        description: t.toast.noCoverLetter,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="companyName">{t.coverLetter.companyName}</Label>
        <Input
          id="companyName"
          placeholder="e.g., Google, Microsoft..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleGenerateCoverLetter} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {t.coverLetter.generate}
        </Button>

        <Button onClick={handleDownloadCoverLetter} variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          {t.coverLetter.download}
        </Button>
      </div>
      
      <FormField
        control={control}
        name="coverLetter"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="coverLetter">{t.coverLetter.yourCoverLetter}</Label>
            <FormControl>
              <Textarea
                id="coverLetter"
                {...field}
                rows={15}
                placeholder={t.coverLetter.placeholder}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
