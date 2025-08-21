import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StudyForm from "@/components/StudyForm";
import StudyResults from "@/components/StudyResults";
import { generateStudyContent } from "@/lib/gemini3";
import { GraduationCap, Brain, Zap } from "lucide-react";

const Guidance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    content: string;
    branch: string;
    field: string;
    youtubeVideos?: Array<{
      title: string;
      videoId: string;
      channel: string;
    }>;
    articles?: Array<{
      title: string;
      url: string;
      source: string;
    }>;
  } | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (branch: string, field: string) => {
    setIsLoading(true);
    setResults(null);

    try {
      const response = await generateStudyContent(branch, field);
      
      if (response.success && response.content) {
        setResults({
          content: response.content,
          branch,
          field,
          youtubeVideos: response.youtubeVideos || [],
          articles: response.articles || []
        });
        toast({
          title: "Content Generated!",
          description: `Latest updates for ${field} in ${branch} are ready.`,
        });
      } else {
        throw new Error(response.error || 'Failed to generate content');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-academic-light/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-academic-blue to-academic-purple">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-academic-blue to-academic-purple bg-clip-text text-transparent">
              StudyGine AI
            </h1>
            <div className="p-3 rounded-full bg-gradient-to-r from-academic-purple to-academic-blue">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay ahead in your academic journey with AI-powered insights. Get the latest trends, 
            news, and developments in your field of study.
          </p>

          <div className="flex items-center justify-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-academic-blue">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-academic-purple">
              <Brain className="h-5 w-5" />
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-2 text-academic-blue">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">Academic Focus</span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <StudyForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {results && (
          <div className="animate-in slide-in-from-bottom duration-500">
            <StudyResults 
              content={results.content}
              branch={results.branch}
              field={results.field}
              youtubeVideos={results.youtubeVideos}
              articles={results.articles}
            />
          </div>
        )}

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Generating personalized study content...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guidance;