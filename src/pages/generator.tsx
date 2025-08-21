import React, { useState } from 'react';
import { Brain, Sparkles, Network, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import { generateKnowledgeGraph, extractTextFromFile, type KnowledgeGraphData } from '@/lib/gemini';

const Generator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [graphData, setGraphData] = useState<any>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setCurrentFile(file);
    setIsProcessing(true);
    
    try {
      toast({
        title: "Processing Document",
        description: "Extracting text and generating knowledge graph...",
      });

      // Extract text from file
      const text = await extractTextFromFile(file);
      
      if (!text.trim()) {
        throw new Error('No readable text found in the file');
      }

      // Generate knowledge graph
      const result = await generateKnowledgeGraph(text);
      
      // Transform data for visualization
      const transformedData = {
        nodes: result.nodes.map(node => ({
          id: node.id,
          name: node.name,
          type: node.type,
          size: Math.max(4, node.importance),
          color: getNodeColor(node.type, node.importance)
        })),
        links: result.relationships.map(rel => ({
          source: rel.source,
          target: rel.target,
          relationship: rel.relationship,
          strength: rel.strength
        }))
      };

      setGraphData(transformedData);
      
      toast({
        title: "Knowledge Graph Generated!",
        description: `Found ${result.nodes.length} concepts and ${result.relationships.length} relationships.`,
      });

    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "Failed to process the document.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getNodeColor = (type: string, importance: number): string => {
    const colors = {
      concept: '#8b5cf6', // Primary purple
      topic: '#06b6d4',   // Cyan
      subtopic: '#10b981' // Green
    };
    
    const baseColor = colors[type as keyof typeof colors] || colors.concept;
    const opacity = Math.max(0.6, importance / 10);
    
    return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  const resetApplication = () => {
    setGraphData(null);
    setCurrentFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-glow absolute top-1/4 left-1/4 w-96 h-96 opacity-20 animate-pulse" />
        <div className="gradient-glow absolute bottom-1/4 right-1/4 w-96 h-96 opacity-15 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Brain className="h-12 w-12 text-primary animate-glow" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Generative Knowledge Graphs
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI automatically builds interactive concept maps from your syllabus, notes, and PDFs
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Network className="w-3 h-3 mr-1" />
              Powered by Gemini 1.5 Flash
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50">
              Interactive Visualization
            </Badge>
          </div>
        </div>

        {!graphData ? (
          <div className="max-w-2xl mx-auto">
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-glow">
                <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced concept extraction and relationship mapping
                </p>
              </Card>
              
              <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-glow">
                <Network className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Interactive Maps</h3>
                <p className="text-sm text-muted-foreground">
                  Explore connections with dynamic, zoomable graphs
                </p>
              </Card>
              
              <Card className="p-6 text-center border-primary/20 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-glow">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Smart Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Discover hidden patterns in your learning materials
                </p>
              </Card>
            </div>

            <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Network className="h-6 w-6 text-primary" />
                  Knowledge Graph
                </h2>
                <p className="text-muted-foreground">
                  Generated from: <span className="font-medium">{currentFile?.name}</span>
                </p>
              </div>
              
              <Button 
                onClick={resetApplication} 
                variant="outline"
                className="transition-smooth hover:bg-primary/10"
              >
                Upload New Document
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <KnowledgeGraph data={graphData} />
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Transform your learning materials into interactive knowledge maps with AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Generator;

