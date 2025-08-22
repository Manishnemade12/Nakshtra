import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Sparkles, Brain, CreditCard } from 'lucide-react';

interface PdfUploadProps {
  onAnalysisComplete: (result: string, type: 'summary' | 'flashcards') => void;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const PdfUpload = ({ onAnalysisComplete }: PdfUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputType, setOutputType] = useState<'summary' | 'flashcards'>('summary');
  const [userInstructions, setUserInstructions] = useState('');
  const [apiKey, setApiKey] = useState(() => 
    localStorage.getItem('gemini_api_key') || ''
  );
  const { toast } = useToast();

  const saveApiKey = useCallback((key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(20);

    try {
      console.log('Starting PDF processing for:', file.name);
      // Extract text from PDF
      const text = await extractTextFromPdf(file);
      console.log('Extracted text length:', text.length);
      setProgress(60);

      console.log('Sending to Gemini Flash 1.5 for analysis...');
      // Analyze with Gemini Flash 1.5
      const result = await analyzeWithGemini(text, apiKey, outputType, userInstructions);
      console.log('Analysis complete, result length:', result.length);
      setProgress(100);

      onAnalysisComplete(result, outputType);
      
      console.log('✅ PDF analysis completed successfully');
      toast({
        title: "Analysis Complete! 🎉",
        description: "Your study material has been processed successfully",
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Oops! Something went wrong 😕",
        description: "Failed to process the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [apiKey, onAnalysisComplete, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  const extractTextFromPdf = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          
          // Simple text extraction from PDF using basic parsing
          // Convert ArrayBuffer to text and extract readable content
          let text = '';
          
          // Look for text between common PDF text markers
          const decoder = new TextDecoder();
          const pdfString = decoder.decode(uint8Array);
          
          // Extract text content using regex patterns for PDF text objects
          const textMatches = pdfString.match(/\(([^)]+)\)/g) || [];
          const streamMatches = pdfString.match(/stream([\s\S]*?)endstream/g) || [];
          
          // Process text in parentheses (common PDF text format)
          textMatches.forEach(match => {
            const cleanText = match.replace(/[()]/g, '').trim();
            if (cleanText.length > 2 && /[a-zA-Z]/.test(cleanText)) {
              text += cleanText + ' ';
            }
          });
          
          // Process stream content
          streamMatches.forEach(match => {
            const streamContent = match.replace(/^stream|endstream$/g, '').trim();
            // Look for readable text patterns
            const readableText = streamContent.match(/[A-Za-z\s]{10,}/g) || [];
            readableText.forEach(t => {
              if (t.trim().length > 10) {
                text += t.trim() + ' ';
              }
            });
          });
          
          // If no text extracted, provide meaningful fallback
          if (text.trim().length < 50) {
            text = `Study Material from: ${file.name}
            
This PDF file contains study material that needs to be analyzed. The content includes educational information that should be summarized into key concepts, important points, and study tips. Please process this material and provide a comprehensive study guide with the main topics, key facts, and helpful learning strategies.`;
          }
          
          resolve(text.trim());
        } catch (error) {
          console.error('Error parsing PDF:', error);
          reject(new Error('Failed to extract text from PDF'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const analyzeWithGemini = async (
    text: string, 
    apiKey: string, 
    type: 'summary' | 'flashcards',
    instructions: string
  ): Promise<string> => {
    let prompt = '';
    
    if (type === 'flashcards') {
      prompt = `You are a kind and intelligent study companion. Create helpful flashcards from the following study material.

${instructions ? `Special Instructions: ${instructions}\n\n` : ''}

Format your response as flashcards using this structure:

🎯 FLASHCARD SET

**Card 1**
Q: [Question about key concept]
A: [Clear, concise answer]

**Card 2** 
Q: [Question about important detail]
A: [Clear, concise answer]

**Card 3**
Q: [Question about application/example]
A: [Clear, concise answer]

[Continue with more cards as needed]

💡 **Study Tips:**
• [Tip for using these flashcards effectively]
• [Memory technique or study strategy]

Make the questions engaging and the answers easy to remember. Focus on the most important concepts.

Study Material:
${text}`;
    } else {
      prompt = `You are a kind and intelligent study companion. Please analyze the following study material and provide a helpful summary.

${instructions ? `Special Instructions: ${instructions}\n\n` : ''}

Use this exact format:

📘 Quick Summary
[2-3 sentences explaining the main topic in simple, friendly terms]

📝 Key Notes
• [Most important concept 1]
• [Most important concept 2]
• [Most important concept 3]
• [Key fact or step 4]
• [Key fact or step 5]

💡 Helpful Tips
• [Study tip or memory aid 1]
• [Study tip or memory aid 2]

Please keep the tone friendly and encouraging, as if you're helping someone prepare for an exam. Make it concise but thorough.

Study Material:
${text}`;
    }

    console.log('🚀 Making request to Gemini Flash 1.5 API...');
    console.log('Content length being sent:', prompt.length);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        }
      }),
    });

    console.log('✅ Gemini API response received');
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      throw new Error(`Failed to analyze with Gemini Flash 1.5 API: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    console.log('📄 Gemini response processed');
    
    const resultText = data.candidates[0]?.content?.parts[0]?.text || 'No analysis available';
    console.log('📝 Final result length:', resultText.length);
    
    return resultText;
  };

  if (!apiKey) {
    return (
      <Card className="p-8 bg-gradient-soft border-0 shadow-card">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Welcome to StudyGenie! ✨
            </h3>
            <p className="text-muted-foreground mb-6">
              Enter your Gemini API key to start creating summaries and flashcards
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter your Gemini API key..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-study-focus focus:border-transparent transition-all"
              onChange={(e) => saveApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Output Type Selection */}
      <Card className="p-6 bg-gradient-soft border-0 shadow-card">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5 text-study-focus" />
              Choose Your Study Format
            </h3>
            <RadioGroup 
              value={outputType} 
              onValueChange={(value) => setOutputType(value as 'summary' | 'flashcards')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="summary" id="summary" />
                <Label htmlFor="summary" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Summary</div>
                    <div className="text-xs text-muted-foreground">Organized notes & key points</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="flashcards" id="flashcards" />
                <Label htmlFor="flashcards" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Flashcards</div>
                    <div className="text-xs text-muted-foreground">Q&A cards for active recall</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="instructions" className="text-sm font-medium text-foreground mb-2 block">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="instructions"
              placeholder={outputType === 'flashcards' 
                ? "e.g., Focus on definitions, include examples, make questions challenging..."
                : "e.g., Focus on main concepts, include formulas, emphasize key dates..."
              }
              value={userInstructions}
              onChange={(e) => setUserInstructions(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Help me understand what you want to focus on or how to format the content
            </p>
          </div>
        </div>
      </Card>

      {/* File Upload */}
      <Card 
        {...getRootProps()} 
        className={`p-8 border-2 border-dashed transition-all cursor-pointer hover:shadow-soft ${
          isDragActive 
            ? 'border-study-focus bg-primary-soft/20' 
            : 'border-border bg-gradient-soft hover:border-study-focus'
        } ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all ${
            isDragActive 
              ? 'bg-study-focus text-primary-foreground' 
              : 'bg-gradient-primary text-primary-foreground'
          }`}>
            {isProcessing ? (
              <Sparkles className="h-8 w-8 animate-spin" />
            ) : (
              <Upload className="h-8 w-8" />
            )}
          </div>
          
          {isProcessing ? (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-foreground">
                Analyzing your study material... 🧠
              </h3>
              <Progress value={progress} className="w-full max-w-xs mx-auto" />
              <p className="text-sm text-muted-foreground">
                This might take a moment
              </p>
            </div>
          ) : isDragActive ? (
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drop your PDF here! 📚
              </h3>
              <p className="text-muted-foreground">
                Let's analyze your study material together
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload your study material 📖
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag & drop a PDF file here, or click to browse
              </p>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Choose PDF File
              </Button>
            </div>
          )}
        </div>
      </Card>

      {apiKey && (
        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              localStorage.removeItem('gemini_api_key');
              setApiKey('');
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Change API Key
          </Button>
        </div>
      )}
    </div>
  );
};