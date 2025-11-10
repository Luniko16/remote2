'use client';

import { useState } from 'react';
import { ArrowLeft, Settings, Palette, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApiKeySettings } from '@/components/api-key-settings';
import { AITest } from '@/components/ai-test';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Resume Builder
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h1 className="text-xl font-semibold">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai" className="gap-2">
                <Shield className="h-4 w-4" />
                AI Features
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="language" className="gap-2">
                <Globe className="h-4 w-4" />
                Language
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>        
    <TabsContent value="ai" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">AI Configuration</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Configure your AI settings to enable smart resume features like content generation and optimization.
                  </p>
                </div>
                
                <div className="flex justify-center gap-6">
                  <ApiKeySettings />
                  <AITest />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Features Overview</CardTitle>
                    <CardDescription>
                      What you can do with AI-powered features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Smart Summary Generation</h4>
                          <p className="text-sm text-muted-foreground">
                            Generate professional resume summaries tailored to your experience and target role.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Experience Enhancement</h4>
                          <p className="text-sm text-muted-foreground">
                            Improve your job descriptions with action-oriented language and industry keywords.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Cover Letter Creation</h4>
                          <p className="text-sm text-muted-foreground">
                            Generate personalized cover letters based on job descriptions and your resume.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Job Description Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Analyze job postings to identify key requirements and optimize your resume accordingly.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Model:</strong> This app uses Google's Gemini 1.5 Flash model for fast, high-quality AI generation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>    
        <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of your resume builder
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Theme customization features coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Language Preferences</CardTitle>
                  <CardDescription>
                    Set your preferred language for the interface and AI-generated content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Language settings coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Data</CardTitle>
                  <CardDescription>
                    Manage your data and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Data Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        Your resume data is stored locally in your browser. We don't store your personal information on our servers.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">API Keys</h4>
                      <p className="text-sm text-muted-foreground">
                        API keys are stored securely in your browser's local storage and are never transmitted to our servers.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">AI Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        When using AI features, your content is sent to Google AI services for processing. Please review Google's privacy policy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}