
'use client';

import { useLanguage } from '@/context/language-context';
import { languages } from '@/lib/translations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
      <SelectTrigger className="w-auto h-9 bg-transparent text-white border-white/40 hover:bg-white/10">
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <div className="hidden md:block">
              <SelectValue />
            </div>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
