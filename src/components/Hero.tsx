import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BookOpen, Users, Zap, Target, Trophy } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Target className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Study
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Gine
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-light">
                AI-Powered Personalized Learning
              </p>
              <p className="text-lg text-white/80 max-w-2xl">
                Transform your study materials into adaptive, multimodal learning experiences. 
                Build knowledge graphs, master concepts with AI tutors, and study smarter with personalized micro-missions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl"
                onClick={onGetStarted}
                className="hover-lift"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift"
              >
                <Users className="w-5 h-5" />
                Join Study Rooms
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-white/70">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-white/70">Concepts Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="lg:w-1/2 lg:pl-12 mt-12 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <Card className="glass hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Knowledge Graphs</h3>
                  <p className="text-white/70 text-sm">
                    Automatically build visual knowledge maps from your study materials
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Daily Micro-Missions</h3>
                  <p className="text-white/70 text-sm">
                    Adaptive daily tasks tailored to your learning style and goals
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Study Rooms</h3>
                  <p className="text-white/70 text-sm">
                    Collaborate with peers in shared learning environments
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Gamified Learning</h3>
                  <p className="text-white/70 text-sm">
                    Earn XP, unlock badges, and track your learning streaks
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}