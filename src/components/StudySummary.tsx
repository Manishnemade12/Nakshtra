import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, RefreshCw, CreditCard, FileText } from 'lucide-react';

interface StudySummaryProps {
  content: string;
  type: 'summary' | 'flashcards';
  onReset: () => void;
}

export const StudySummary = ({ content, type, onReset }: StudySummaryProps) => {
  const downloadContent = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study-${type}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            {type === 'flashcards' ? (
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            ) : (
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Your Study {type === 'flashcards' ? 'Flashcards' : 'Summary'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {type === 'flashcards' 
                ? 'Perfect for active recall and memory practice! 🧠'
                : 'Ready to help you ace your studies! 🎯'
              }
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadContent}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            New Upload
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-gradient-soft border-0 shadow-card">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {content.split('\n').map((line, index) => {
              // Handle emoji headers and flashcard titles
              if (line.startsWith('📘') || line.startsWith('📝') || line.startsWith('💡') || 
                  line.startsWith('🎯') || line.includes('FLASHCARD')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-study-focus mt-6 mb-3 first:mt-0">
                    {line}
                  </h3>
                );
              }
              
              // Handle flashcard questions and answers
              if (line.startsWith('**Card') || line.startsWith('Q:') || line.startsWith('A:')) {
                const isQuestion = line.startsWith('Q:');
                const isAnswer = line.startsWith('A:');
                const isCardTitle = line.startsWith('**Card');
                
                return (
                  <div key={index} className={`mb-3 ${
                    isCardTitle ? 'font-semibold text-study-focus mt-4' :
                    isQuestion ? 'font-medium text-foreground bg-primary-soft/30 p-3 rounded-lg' :
                    isAnswer ? 'text-foreground bg-study-gentle p-3 rounded-lg border-l-4 border-study-success ml-4' :
                    ''
                  }`}>
                    {line}
                  </div>
                );
              }
              
              // Handle bullet points
              if (line.startsWith('•')) {
                return (
                  <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                    <span className="text-study-success font-bold mt-1 text-sm">•</span>
                    <span className="text-foreground">{line.substring(1).trim()}</span>
                  </div>
                );
              }
              
              // Handle empty lines
              if (line.trim() === '') {
                return <div key={index} className="h-2"></div>;
              }
              
              // Regular paragraphs
              return (
                <p key={index} className="text-foreground mb-3 leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="bg-warning/20 border border-warning/30 rounded-lg p-4">
        <p className="text-sm text-warning-foreground">
          <strong>Study Tip:</strong> {type === 'flashcards' 
            ? 'Test yourself regularly with these cards and focus on the ones you get wrong. Spaced repetition is key! 🔄'
            : 'Review these key points regularly and try to explain them in your own words. Good luck with your studies! 🌟'
          }
        </p>
      </div>
    </div>
  );
};