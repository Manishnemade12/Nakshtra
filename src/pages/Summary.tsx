import { useState } from 'react';
import { PdfUpload } from '@/components/PdfUpload';
import { StudySummary } from '@/components/StudySummary';
import { GraduationCap, Sparkles } from 'lucide-react';

const Summary = () => {
  const [content, setContent] = useState<string>('');
  const [contentType, setContentType] = useState<'summary' | 'flashcards'>('summary');

  const handleAnalysisComplete = (newContent: string, type: 'summary' | 'flashcards') => {
    setContent(newContent);
    setContentType(type);
  };

  const handleReset = () => {
    setContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StudyGenie
            </h1>
            <Sparkles className="h-6 w-6 text-study-focus" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your friendly AI study companion that transforms PDF materials into clear summaries 
            or interactive flashcards to help you succeed! 📚✨
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!content ? (
            <PdfUpload onAnalysisComplete={handleAnalysisComplete} />
          ) : (
            <StudySummary content={content} type={contentType} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Made with 💙 to help you achieve your academic goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
