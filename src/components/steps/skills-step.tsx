
'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { FormMessage } from '../ui/form';
import { useLanguage } from '@/context/language-context';

export function SkillsStep() {
  const { setValue, getValues, formState: { errors } } = useFormContext<ResumeData>();
  const [skillInput, setSkillInput] = useState('');
  const { t } = useLanguage();

  const skills = getValues('skills') || [];

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setValue('skills', [...skills, trimmedSkill], { shouldValidate: true });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue('skills', skills.filter(skill => skill !== skillToRemove), { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skillInput">{t.skills.addSkill}</Label>
        <div className="flex gap-2">
          <Input
            id="skillInput"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button onClick={handleAddSkill}>
            <Plus className="mr-2 h-4 w-4" /> {t.skills.add}
          </Button>
        </div>
        {errors.skills && <FormMessage>{errors.skills.message}</FormMessage>}
      </div>
      <div className="space-y-2">
        <Label>{t.skills.yourSkills}</Label>
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[80px] bg-muted/30">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-base py-1 px-3">
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 rounded-full hover:bg-destructive/20 p-0.5"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">{t.skills.noSkills}</p>
          )}
        </div>
      </div>
    </div>
  );
}
