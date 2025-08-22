import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Timer,
  Leaf,
  Heart,
  Zap,
  Moon,
  Sun,
  Wind
} from "lucide-react";

export default function Meditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSession, setSelectedSession] = useState(0);
  const [progress, setProgress] = useState(0);

  const sessions = [
    {
      title: "Focus & Concentration",
      description: "Improve your focus before studying genetics concepts",
      duration: "10 min",
      type: "Study Prep",
      icon: Brain,
      color: "from-primary to-secondary-purple",
      difficulty: "Beginner"
    },
    {
      title: "Stress Relief",
      description: "Release tension and anxiety from challenging coursework",
      duration: "15 min", 
      type: "Relaxation",
      icon: Heart,
      color: "from-secondary-purple to-accent-teal",
      difficulty: "Beginner"
    },
    {
      title: "Mental Clarity",
      description: "Clear your mind before tackling complex genetic problems",
      duration: "12 min",
      type: "Clarity",
      icon: Leaf,
      color: "from-accent-teal to-primary",
      difficulty: "Intermediate"
    },
    {
      title: "Energy Boost",
      description: "Energize yourself for longer study sessions",
      duration: "8 min",
      type: "Energizing",
      icon: Zap,
      color: "from-primary to-accent-teal",
      difficulty: "Beginner"
    },
    {
      title: "Sleep Preparation",
      description: "Wind down after intensive study sessions",
      duration: "20 min",
      type: "Sleep",
      icon: Moon,
      color: "from-secondary-purple to-primary",
      difficulty: "Beginner"
    },
    {
      title: "Morning Motivation",
      description: "Start your genetics study day with positive energy",
      duration: "6 min",
      type: "Motivation",
      icon: Sun,
      color: "from-accent-teal to-secondary-purple",
      difficulty: "Beginner"
    }
  ];

  const breathingExercises = [
    { name: "4-7-8 Breathing", duration: "5 min", description: "Calm your nervous system" },
    { name: "Box Breathing", duration: "7 min", description: "Enhance focus and concentration" }, 
    { name: "Alternate Nostril", duration: "10 min", description: "Balance your mental state" },
  ];

  const stats = [
    { label: "Sessions Completed", value: "24", change: "+3 this week" },
    { label: "Total Minutes", value: "240", change: "+45 this week" },
    { label: "Streak Days", value: "7", change: "Personal best!" },
    { label: "Stress Reduction", value: "85%", change: "Avg improvement" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-accent-teal" />
          Meditation & Mindfulness
        </h1>
        <p className="text-muted-foreground">
          Enhance your learning with guided meditation and breathing exercises
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Player */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Session Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="glass p-8">
              <div className="text-center space-y-6">
                {/* Session Info */}
                <div>
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${sessions[selectedSession].color} flex items-center justify-center mb-4`}>
                    {React.createElement(sessions[selectedSession].icon, { className: "w-12 h-12 text-white" })}
                  </div>
                  <h2 className="text-2xl font-bold font-poppins mb-2">
                    {sessions[selectedSession].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {sessions[selectedSession].description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Badge variant="secondary" className={getDifficultyColor(sessions[selectedSession].difficulty)}>
                      {sessions[selectedSession].difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-accent-teal border-accent-teal">
                      {sessions[selectedSession].duration}
                    </Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0:00</span>
                    <span>{sessions[selectedSession].duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setProgress(0)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="lg"
                    className={`rounded-full w-16 h-16 bg-gradient-to-r ${sessions[selectedSession].color} hover:scale-105 smooth-transition`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Background Animation */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 -z-10 rounded-xl overflow-hidden"
                    >
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 360]
                        }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className={`absolute inset-0 bg-gradient-to-r ${sessions[selectedSession].color} opacity-5`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Session Library */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-xl font-semibold font-poppins mb-6">Meditation Library</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer smooth-transition hover:shadow-lg ${
                        selectedSession === index 
                          ? 'ring-2 ring-accent-teal bg-accent-teal/5' 
                          : 'hover:bg-muted/30'
                      }`}
                      onClick={() => setSelectedSession(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${session.color} flex items-center justify-center flex-shrink-0`}>
                          <session.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{session.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {session.description}
                          </p>
                          <div className="flex space-x-2">
                            <Badge variant="secondary">
                              {session.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {session.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-6">Your Progress</h3>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                    <div className="text-xs text-accent-teal bg-accent-teal/10 px-2 py-1 rounded">
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Breathing Exercises */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Wind className="w-5 h-5 mr-2 text-secondary-purple" />
                  Breathing Exercises
                </h3>
              </div>
              <div className="space-y-3">
                {breathingExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="p-3 rounded-lg hover:bg-muted/30 smooth-transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                      <Badge variant="secondary">{exercise.duration}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{exercise.description}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Timer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-4 flex items-center">
                <Timer className="w-5 h-5 mr-2 text-primary" />
                Quick Timer
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 15].map((minutes) => (
                    <Button
                      key={minutes}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {minutes}m
                    </Button>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary-purple">
                  Start Free Meditation
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}