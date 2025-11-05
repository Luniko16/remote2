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

export function ProjectsStep() {
  const { control } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div id="projects-container" className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4 relative bg-muted/30">
            <h3 className="font-semibold text-lg">Project {index + 1}</h3>
            
            <FormField
              control={control}
              name={`projects.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`name-${field.name}`}>Project Name</Label>
                  <FormControl>
                    <Input id={`name-${field.name}`} {...field} placeholder="E-commerce Platform" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`description-${field.name}`}>Description</Label>
                  <FormControl>
                    <Textarea 
                      id={`description-${field.name}`} 
                      {...field} 
                      placeholder="Describe what the project does and your role..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.technologies`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`technologies-${field.name}`}>Technologies Used</Label>
                  <FormControl>
                    <Input 
                      id={`technologies-${field.name}`} 
                      {...field} 
                      placeholder="React, Node.js, MongoDB, AWS"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`duration-${field.name}`}>Duration (Optional)</Label>
                  <FormControl>
                    <Input 
                      id={`duration-${field.name}`} 
                      {...field} 
                      placeholder="Jan 2024 - Mar 2024"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.link`}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor={`link-${field.name}`}>Project Link (Optional)</Label>
                  <FormControl>
                    <Input 
                      id={`link-${field.name}`} 
                      {...field} 
                      placeholder="https://github.com/username/project"
                    />
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
        onClick={() => append({ 
          id: Date.now().toString(), 
          name: '', 
          description: '', 
          technologies: '',
          duration: '',
          link: ''
        })}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
}
