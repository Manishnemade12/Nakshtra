import React, { useCallback } from 'react';
import { Upload, FileText, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-primary/20 bg-card/50 backdrop-blur-sm">
      <div
        className="flex flex-col items-center justify-center p-12 text-center transition-smooth hover:bg-accent/10"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="gradient-glow absolute inset-0 opacity-20" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-center">
            {isProcessing ? (
              <Brain className="h-16 w-16 animate-pulse text-primary animate-glow" />
            ) : (
              <Upload className="h-16 w-16 text-primary/70 transition-smooth group-hover:text-primary animate-float" />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              {isProcessing ? 'Generating Knowledge Graph...' : 'Upload Your Document'}
            </h3>
            <p className="text-muted-foreground">
              {isProcessing 
                ? 'AI is analyzing concepts and relationships' 
                : 'Drop your PDF, syllabus, or notes here to generate an interactive concept map'
              }
            </p>
          </div>
          
          {!isProcessing && (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="relative overflow-hidden border-primary/50 bg-primary/10 hover:bg-primary/20 transition-smooth"
                asChild
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Choose File
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileChange}
                  />
                </label>
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Supports PDF, TXT, and Markdown files
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;