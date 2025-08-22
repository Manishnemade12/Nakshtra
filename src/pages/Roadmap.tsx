import { useState } from "react";
import { OnboardingForm } from "@/components/OnboardingForm";
import { StudyDashboard1 } from "@/components/StudyDashboard1";
import { generateStudyPlan, type StudyPlan } from "@/lib/gemini4";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface OnboardingData {
  name: string;
  age: number;
  subject: string;
  goals: string;
  confidenceLevel: number;
  hoursPerWeek: number;
  preferredTime: string;
}

const Roadmap = () => {
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setUserData(data);
    setIsGenerating(true);

    try {
      toast({
        title: "Creating your study plan...",
        description: "Our AI is crafting a personalized learning journey just for you!",
      });

      const plan = await generateStudyPlan(data);
      setStudyPlan(plan);
      
      toast({
        title: "Study plan ready! 🎉",
        description: `Your personalized ${data.subject} roadmap is ready to explore.`,
      });
    } catch (error) {
      console.error("Error generating study plan:", error);
      toast({
        title: "Something went wrong",
        description: "We'll create a basic plan for you to get started!",
        variant: "destructive",
      });
      
      // The generateStudyPlan function already has a fallback, so we can still proceed
      const fallbackPlan = await generateStudyPlan(data);
      setStudyPlan(fallbackPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Crafting Your Study Plan...
          </h2>
          <p className="text-muted-foreground">
            Our AI is analyzing your goals and creating a personalized learning journey
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  if (!studyPlan) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
          <h2 className="text-2xl font-bold">Setting up your dashboard...</h2>
        </div>
      </div>
    );
  }

  return <StudyDashboard1 userData={userData} studyPlan={studyPlan} />;
};

export default Roadmap;