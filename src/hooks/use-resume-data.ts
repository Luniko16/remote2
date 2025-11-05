'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ResumeData } from '@/lib/types';
import { initialResumeData } from '@/lib/resume-data';

export function useResumeData() {
  const [initialData, setInitialData] = useState<ResumeData>(initialResumeData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedData = window.localStorage.getItem('resumeData');
      if (savedData) {
        setInitialData(JSON.parse(savedData));
      } else {
        setInitialData(initialResumeData);
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
      setInitialData(initialResumeData);
    }
  }, []);

  const setResumeData = useCallback((data: ResumeData) => {
    if (isMounted) {
      try {
        window.localStorage.setItem('resumeData', JSON.stringify(data));
      } catch (error) {
        console.error('Error writing to localStorage', error);
      }
    }
  }, [isMounted]);

  const resetResumeData = useCallback(() => {
    if (isMounted) {
      try {
        window.localStorage.removeItem('resumeData');
      } catch (error) {
        console.error('Error removing data from localStorage', error);
      }
    }
  }, [isMounted]);


  return {
    initialData,
    setResumeData,
    resetResumeData,
    isMounted,
  };
}
