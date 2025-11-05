
'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ResumeData } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useLanguage } from '@/context/language-context';

export function EducationStep() {
  const { control } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div id="education-container" className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-muted/30">
            <h3 className="font-semibold text-lg">{t.education.title} {index + 1}</h3>
            
            <FormField
              control={control}
              name={`education.${index}.school`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`school-${field.name}`}>{t.education.school}</Label>
                  <FormControl>
                    <Input id={`school-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`degree-${field.name}`}>{t.education.degree}</Label>
                  <FormControl>
                    <Input id={`degree-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.field`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`field-${field.name}`}>{t.education.field}</Label>
                  <FormControl>
                    <Input id={`field-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`duration-${field.name}`}>{t.education.duration}</Label>
                  <FormControl>
                    <Input id={`duration-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.gpa`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`gpa-${field.name}`}>{t.education.gpa}</Label>
                  <FormControl>
                    <Input id={`gpa-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`description-${field.name}`}>{t.education.description}</Label>
                  <FormControl>
                    <Textarea id={`description-${field.name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button variant="destructive" size="icon" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={() => append({ id: Date.now().toString(), school: '', degree: '', field: '', duration: '', gpa: '', description: '' })}
      >
        <Plus className="mr-2 h-4 w-4" /> {t.education.addAnother}
      </Button>
    </div>
  );
}
