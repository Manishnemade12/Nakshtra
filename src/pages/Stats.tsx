import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Clock,
  BookOpen,
  Brain,
  Zap,
  BarChart3,
  Activity
} from "lucide-react";

export default function Stats() {
  const weeklyData = [
    { day: 'Mon', hours: 3.5, accuracy: 89 },
    { day: 'Tue', hours: 2.8, accuracy: 92 },
    { day: 'Wed', hours: 4.2, accuracy: 87 },
    { day: 'Thu', hours: 3.1, accuracy: 94 },
    { day: 'Fri', hours: 2.9, accuracy: 91 },
    { day: 'Sat', hours: 5.1, accuracy: 88 },
    { day: 'Sun', hours: 3.8, accuracy: 93 },
  ];

  const subjectProgress = [
    { subject: 'DNA Structure', progress: 92, total: 120, completed: 110 },
    { subject: 'Cell Division', progress: 85, total: 150, completed: 128 },
    { subject: 'Inheritance Patterns', progress: 78, total: 200, completed: 156 },
    { subject: 'Genetic Mutations', progress: 65, total: 180, completed: 117 },
    { subject: 'Population Genetics', progress: 45, total: 160, completed: 72 },
  ];

  const achievements = [
    { title: 'DNA Master', description: 'Completed all DNA structure modules', date: '2 days ago', color: 'from-primary to-secondary-purple' },
    { title: 'Quick Learner', description: 'Finished 5 modules in one day', date: '1 week ago', color: 'from-secondary-purple to-accent-teal' },
    { title: 'Perfect Score', description: 'Got 100% on genetics quiz', date: '2 weeks ago', color: 'from-accent-teal to-primary' },
    { title: 'Consistency Champion', description: 'Studied for 7 consecutive days', date: '3 weeks ago', color: 'from-primary to-accent-teal' },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-accent-teal" />
          Learning Statistics
        </h1>
        <p className="text-muted-foreground">
          Track your progress and analyze your learning patterns
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="glass p-6 neural-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary-purple">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">+12%</Badge>
          </div>
          <h3 className="text-2xl font-bold font-poppins mb-1">42.5h</h3>
          <p className="text-muted-foreground text-sm">Total Study Time</p>
        </Card>

        <Card className="glass p-6 neural-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-secondary-purple to-accent-teal">
              <Target className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">+5%</Badge>
          </div>
          <h3 className="text-2xl font-bold font-poppins mb-1">91%</h3>
          <p className="text-muted-foreground text-sm">Average Accuracy</p>
        </Card>

        <Card className="glass p-6 neural-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-accent-teal to-primary">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">+2</Badge>
          </div>
          <h3 className="text-2xl font-bold font-poppins mb-1">8</h3>
          <p className="text-muted-foreground text-sm">Modules Completed</p>
        </Card>

        <Card className="glass p-6 neural-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent-teal">
              <Award className="w-6 h-6 text-white" />
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">+3</Badge>
          </div>
          <h3 className="text-2xl font-bold font-poppins mb-1">15</h3>
          <p className="text-muted-foreground text-sm">Achievements</p>
        </Card>
      </motion.div>

      {/* Weekly Activity & Subject Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold font-poppins flex items-center">
                <Activity className="w-5 h-5 mr-2 text-accent-teal" />
                Weekly Activity
              </h3>
              <Badge variant="outline" className="text-accent-teal border-accent-teal">
                This Week
              </Badge>
            </div>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 text-sm font-medium text-muted-foreground">
                    {day.day}
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-muted/30 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.hours / maxHours) * 100}%` }}
                        transition={{ delay: 0.2 * index, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent-teal rounded-lg"
                      />
                    </div>
                    <div className="absolute inset-y-0 left-2 flex items-center">
                      <span className="text-xs font-medium text-white">
                        {day.hours}h
                      </span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium text-green-600">
                      {day.accuracy}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold font-poppins flex items-center">
                <Brain className="w-5 h-5 mr-2 text-secondary-purple" />
                Subject Progress
              </h3>
              <Badge variant="outline" className="text-secondary-purple border-secondary-purple">
                5 Subjects
              </Badge>
            </div>
            <div className="space-y-6">
              {subjectProgress.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{subject.subject}</h4>
                    <span className="text-sm text-muted-foreground">
                      {subject.completed}/{subject.total}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={subject.progress} className="h-3" />
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <span className="text-xs font-medium">
                        {subject.progress}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-poppins flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              Recent Achievements
            </h3>
            <Badge variant="outline" className="text-primary border-primary">
              {achievements.length} Total
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 smooth-transition border-l-4 border-l-transparent hover:border-l-accent-teal"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {achievement.description}
                    </p>
                    <span className="text-xs text-accent-teal font-medium">
                      {achievement.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}