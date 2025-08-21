import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Target, Zap } from "lucide-react";
// import studyBuddyHero from "@/assets/study-buddy-hero.jpg";

export function StudyHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-primary">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-success rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-energy rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-motivation rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Study<span className="text-transparent bg-clip-text bg-gradient-energy">Genie</span>
              </h1>
              <h2 className="text-2xl lg:text-4xl font-semibold text-muted-foreground">
                Your AI Study Buddy
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your learning journey with personalized AI motivation, 
                smart study planning, and real-time coaching that adapts to your goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="border-primary/50 hover:bg-primary/10 transition-smooth">
                <Target className="mr-2 h-5 w-5" />
                Set Study Goals
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Students Motivated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-energy">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="bg-gradient-card backdrop-blur-sm border-primary/20 shadow-card hover:shadow-glow transition-all duration-500">
              <img
                // src={studyBuddyHero}
                alt="AI Study Buddy - Your personal learning assistant"
                className="w-full h-auto rounded-lg"
              />
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-success p-4 rounded-full shadow-success animate-bounce">
                <Zap className="h-8 w-8 text-success-foreground" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-energy p-3 rounded-full shadow-card animate-pulse">
                <Sparkles className="h-6 w-6 text-energy-foreground" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}