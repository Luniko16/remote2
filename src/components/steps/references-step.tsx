'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { useLanguage } from '@/context/language-context';

export function ReferencesStep() {
  const { control } = useFormContext<ResumeData>();
  const { language } = useLanguage();
  
  // For now, using English labels - you can add translations later
  const t = {
    title: 'References',
    description: 'Add professional references who can vouch for your work experience and character.',
    addReference: 'Add Reference',
    name: 'Full Name',
    jobTitle: 'Job Title',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    relationship: 'Relationship',
    relationshipPlaceholder: 'e.g., Former Manager, Colleague, Client',
    remove: 'Remove',
    optional: '(Optional - you can also write "References available upon request")'
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  });

  const addReference = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: '',
      relationship: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-muted-foreground mb-4">{t.description}</p>
        <p className="text-sm text-muted-foreground">{t.optional}</p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Reference {index + 1}</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                {t.remove}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`references.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.name}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`references.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.jobTitle}</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`references.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.company}</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`references.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.relationship}</FormLabel>
                      <FormControl>
                        <Input placeholder={t.relationshipPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`references.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.email}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.smith@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`references.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.phone}</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button type="button" onClick={addReference} variant="outline" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t.addReference}
        </Button>
      </div>
    </div>
  );
}