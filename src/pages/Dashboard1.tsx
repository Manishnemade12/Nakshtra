import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  Award,
  ChevronRight,
  Zap
} from "lucide-react";
import aiHeroImage from "@/assets/ai-brain-hero.jpg";

export default function Dashboard1() {
  const stats = [
    { label: "Study Hours", value: "42.5", change: "+12%", icon: Clock, color: "from-primary to-secondary-purple" },
    { label: "Completed Courses", value: "8", change: "+2", icon: BookOpen, color: "from-secondary-purple to-accent-teal" },
    { label: "Accuracy Rate", value: "94%", change: "+5%", icon: Target, color: "from-accent-teal to-primary" },
    { label: "Achievements", value: "15", change: "+3", icon: Award, color: "from-primary to-accent-teal" },
  ];

  const recentActivity = [
    { subject: "DNA Replication", progress: 85, time: "2 hours ago" },
    { subject: "Protein Synthesis", progress: 72, time: "Yesterday" },
    { subject: "Cell Division", progress: 91, time: "2 days ago" },
    { subject: "Genetic Mutations", progress: 67, time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl glass p-8 md:p-12"
      >
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold font-poppins mb-4"
            >
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent">
                GenaStudy
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-6"
            >
              Your personalized AI-powered genetics learning platform. Continue your journey through the fascinating world of genetic science.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl smooth-transition">
                Continue Learning <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <img 
              src={aiHeroImage} 
              alt="AI Brain Neural Network" 
              className="w-full h-64 object-cover rounded-2xl shadow-2xl float dna-glow"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
          >
            <Card className="glass p-6 hover:shadow-lg smooth-transition neural-glow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-500 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold font-poppins mb-1">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity & Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold font-poppins flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-accent-teal" />
                Recent Activity
              </h3>
              <Button variant="ghost" size="sm" className="text-accent-teal hover:bg-accent-teal/10">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 smooth-transition"
                >
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{activity.subject}</h4>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32">
                      <Progress value={activity.progress} className="h-2" />
                    </div>
                    <span className="text-sm font-medium w-12">{activity.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold font-poppins flex items-center">
                <Brain className="w-5 h-5 mr-2 text-secondary-purple" />
                AI Recommendations
              </h3>
              <Button variant="ghost" size="sm" className="text-secondary-purple hover:bg-secondary-purple/10">
                <Zap className="w-4 h-4 mr-1" />
                Generate
              </Button>
            </div>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary-purple/10 border border-primary/20"
              >
                <h4 className="font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Focus on Mitosis
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your recent quiz results, reviewing cell division concepts will strengthen your foundation.
                </p>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Start Review
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="p-4 rounded-xl bg-gradient-to-r from-accent-teal/10 to-primary/10 border border-accent-teal/20"
              >
                <h4 className="font-semibold mb-2 flex items-center">
                  <div className="w-2 h-2 bg-accent-teal rounded-full mr-2"></div>
                  Practice Punnett Squares
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Interactive exercises available to master genetic probability calculations.
                </p>
                <Button size="sm" variant="outline" className="border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white">
                  Practice Now
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}