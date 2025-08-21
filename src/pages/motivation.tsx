import { StudyHero } from "@/components/StudyHero";
import { StudyDashboard } from "@/components/StudyDashboard";
import { AIMotivation } from "@/components/AIMotivation";
import { StudyTimer } from "@/components/StudyTimer";
import { StudyPlanner } from "@/components/StudyPlanner";
import { StudyStats } from "@/components/StudyStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

const Motivation = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <StudyHero />
      
      {/* Features Overview */}
   

      {/* AI Motivation Center */}
      <AIMotivation />

      {/* Study Timer */}
      <StudyTimer />

      {/* Study Planner */}
      <StudyPlanner />

      {/* Study Dashboard */}
      <StudyDashboard />

      {/* Study Statistics */}
      <StudyStats />

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-success rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-energy rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-primary-foreground">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've revolutionized their learning with AI-powered study assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-glow"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/50 text-primary-foreground hover:bg-white/10 transition-smooth"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Motivation;
