
'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ResumeData } from '@/lib/types';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useLanguage } from '@/context/language-context';

export function PersonalInfoStep() {
  const { control } = useFormContext<ResumeData>();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="personal.fullName"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="fullName">{t.personalInfo.fullName}</Label>
            <FormControl>
              <Input id="fullName" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.jobTitle"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="jobTitle">{t.personalInfo.jobTitle}</Label>
            <FormControl>
              <Input id="jobTitle" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email">{t.personalInfo.email}</Label>
            <FormControl>
              <Input id="email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.phone"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="phone">{t.personalInfo.phone}</Label>
            <FormControl>
              <Input id="phone" type="tel" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.address"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="address">{t.personalInfo.address}</Label>
            <FormControl>
              <Input id="address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.linkedin"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="linkedin">{t.personalInfo.linkedin}</Label>
            <FormControl>
              <Input id="linkedin" type="url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personal.portfolio"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="portfolio">{t.personalInfo.portfolio}</Label>
            <FormControl>
              <Input id="portfolio" type="url" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
