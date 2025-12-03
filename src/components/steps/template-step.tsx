
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
  { name: 'elegant', label: 'Elegant', image: 'https://picsum.photos/seed/elegant/300/400' },
  { name: 'bold', label: 'Bold', image: 'https://picsum.photos/seed/bold/300/400' },
  { name: 'minimalist', label: 'Minimalist', image: 'https://picsum.photos/seed/minimal/300/400' },
  { name: 'ai-powered', label: 'AI-Powered', image: 'https://picsum.photos/seed/aipowered/300/400' },
  { name: 'capaciti-style', label: 'CAPACITI Style', image: 'https://picsum.photos/seed/capaciti/300/400' },
];

const colors = [
  { name: 'Navy Blue', value: 'hsl(220, 19%, 38%)' },
  { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
  { name: 'Deep Teal', value: 'hsl(173, 58%, 39%)' },
  { name: 'Forest Green', value: 'hsl(140, 40%, 35%)' },
  { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
  { name: 'Slate Gray', value: 'hsl(210, 15%, 45%)' },
  { name: 'Dark Blue', value: 'hsl(210, 50%, 35%)' },
  { name: 'Espresso', value: 'hsl(25, 30%, 30%)' },
  { name: 'Midnight', value: 'hsl(230, 35%, 25%)' },
  { name: 'Steel Blue', value: 'hsl(207, 44%, 49%)' },
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
