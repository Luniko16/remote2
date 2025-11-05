
'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ResumeData, Template } from '@/lib/types';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

const templates: { name: Template; label: string; image: string }[] = [
  { name: 'professional', label: 'Professional', image: 'https://picsum.photos/seed/prof/300/400' },
  { name: 'modern', label: 'Modern', image: 'https://picsum.photos/seed/modern/300/400' },
  { name: 'creative', label: 'Creative', image: 'https://picsum.photos/seed/creative/300/400' },
];

const colors = [
  { name: 'Indigo', value: 'hsl(220, 19%, 38%)' },
  { name: 'Slate Blue', value: 'hsl(203, 26%, 60%)' },
  { name: 'Teal', value: 'hsl(173, 58%, 39%)' },
  { name: 'Rose', value: 'hsl(340, 82%, 52%)' },
];

const fonts = [
  { name: 'Inter', value: 'var(--font-inter)' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
];

export function TemplateStep() {
  const { watch, setValue } = useFormContext<ResumeData>();
  const resumeData = watch();
  const { t } = useLanguage();

  const updateStyle = (field: 'color' | 'font', value: string) => {
    setValue(`style.${field}`, value, { shouldValidate: true });
  };

  const updateTemplate = (template: Template) => {
    setValue('template', template, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.template.chooseTemplate}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.name}
              className={cn(
                'border-2 rounded-lg p-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background',
                resumeData.template === template.name ? 'border-primary ring-2 ring-primary' : 'border-transparent'
              )}
              onClick={() => updateTemplate(template.name)}
            >
              <div className="relative aspect-[3/4] w-full bg-muted rounded-md overflow-hidden">
                <Image src={template.image} alt={template.label} fill className="object-cover" data-ai-hint="resume template" />
              </div>
              <p className="text-center font-medium mt-2 text-sm">{template.label}</p>
            </button>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t.template.customization}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.template.accentColor}</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className="h-8 w-8 rounded-full border-2 transition-all flex items-center justify-center"
                  style={{ backgroundColor: color.value, borderColor: resumeData.style.color === color.value ? 'hsl(var(--primary))' : 'transparent' }}
                  onClick={() => updateStyle('color', color.value)}
                  aria-label={`Select ${color.name} color`}
                >
                  {resumeData.style.color === color.value && <Check className="h-5 w-5 text-primary-foreground" />}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-select">{t.template.fontFamily}</Label>
            <Select value={resumeData.style.font} onValueChange={(value) => updateStyle('font', value)}>
              <SelectTrigger id="font-select">
                <SelectValue placeholder={t.template.selectFont} />
              </SelectTrigger>
              <SelectContent>
                {fonts.map((font) => (
                  <SelectItem key={font.name} value={font.value} style={{ fontFamily: font.value }}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
