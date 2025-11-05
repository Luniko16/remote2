
'use client';

import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '@/lib/types';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { enhanceExperienceDescription } from '@/ai/flows/enhance-experience-description';
import { useToast } from '@/hooks/use-toast';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useLanguage } from '@/context/language-context';

export function ExperienceStep() {
  const { control, setValue, getValues } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });
  const { toast } = useToast();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const handleEnhance = async (index: number) => {
    const entry = getValues(`experience.${index}`);
    if (!entry.description) {
      toast({
        title: t.toast.inputRequired,
        description: 'Please enter a description to enhance.',
        variant: 'destructive',
      });
      return;
    }
    setLoadingStates(prev => ({ ...prev, [entry.id]: true }));
    try {
      const result = await enhanceExperienceDescription({
        jobTitle: entry.jobRole || getValues('personal.jobTitle'),
        description: entry.description,
      });
      setValue(`experience.${index}.description`, result.enhancedDescription, { shouldValidate: true });
      toast({
        title: t.toast.success,
        description: t.toast.enhanceSuccess,
      });
    } catch (error) {
      console.error('AI enhancement error:', error);
      toast({
        title: t.toast.error,
        description: t.toast.enhanceError,
        variant: 'destructive',
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [entry.id]: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div id="experience-container" className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-muted/30">
            <h3 className="font-semibold text-lg">{t.experience.title} {index + 1}</h3>

            <FormField
              control={control}
              name={`experience.${index}.jobRole`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`jobRole-${field.name}`}>{t.experience.jobRole}</Label>
                  <FormControl>
                    <Input id={`jobRole-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`experience.${index}.company`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`company-${field.name}`}>{t.experience.company}</Label>
                  <FormControl>
                    <Input id={`company-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`experience.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`duration-${field.name}`}>{t.experience.duration}</Label>
                  <FormControl>
                    <Input id={`duration-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`experience.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`description-${field.name}`}>{t.experience.description}</Label>
                  <FormControl>
                    <Textarea id={`description-${field.name}`} {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={() => handleEnhance(index)} disabled={loadingStates[field.id]}>
                {loadingStates[field.id] ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {t.experience.enhance}
              </Button>
              <Button variant="destructive" size="icon" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={() => append({ id: Date.now().toString(), jobRole: '', company: '', duration: '', description: '' })}
      >
        <Plus className="mr-2 h-4 w-4" /> {t.experience.addAnother}
      </Button>
    </div>
  );
}
