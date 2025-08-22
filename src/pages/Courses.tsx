import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock,
  Star,
  Users,
  FileText,
  Video,
  Award,
  TrendingUp
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Fundamentals of Genetics",
      description: "Master the basic concepts of genetics including DNA, genes, and inheritance patterns.",
      instructor: "Dr. Sarah Wilson",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 2847,
      progress: 85,
      modules: 12,
      completedModules: 10,
      status: "in-progress",
      color: "from-primary to-secondary-purple",
      tags: ["DNA", "Inheritance", "Basics"]
    },
    {
      id: 2,
      title: "Molecular Biology Deep Dive",
      description: "Explore DNA replication, transcription, translation, and gene expression regulation.",
      instructor: "Prof. Michael Chen",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 1923,
      progress: 45,
      modules: 16,
      completedModules: 7,
      status: "in-progress",
      color: "from-secondary-purple to-accent-teal",
      tags: ["Transcription", "Translation", "Gene Expression"]
    },
    {
      id: 3,
      title: "Human Genetics & Disease",
      description: "Study genetic disorders, inheritance patterns, and the role of genetics in human health.",
      instructor: "Dr. Emma Rodriguez",
      duration: "10 weeks",
      level: "Advanced", 
      rating: 4.7,
      students: 1456,
      progress: 0,
      modules: 20,
      completedModules: 0,
      status: "not-started",
      color: "from-accent-teal to-primary",
      tags: ["Human Genetics", "Disease", "Medical Genetics"]
    },
    {
      id: 4,
      title: "Population Genetics",
      description: "Understand allele frequencies, Hardy-Weinberg equilibrium, and evolutionary genetics.",
      instructor: "Dr. James Thompson",
      duration: "7 weeks",
      level: "Advanced",
      rating: 4.6,
      students: 987,
      progress: 100,
      modules: 14,
      completedModules: 14,
      status: "completed",
      color: "from-primary to-accent-teal",
      tags: ["Evolution", "Population", "Statistics"]
    }
  ];

  const recentLessons = [
    { title: "DNA Replication Mechanisms", duration: "45 min", type: "video", completed: true },
    { title: "Mitosis vs Meiosis Comparison", duration: "30 min", type: "interactive", completed: true },
    { title: "Punnett Square Practice", duration: "20 min", type: "quiz", completed: false },
    { title: "Gene Expression Regulation", duration: "50 min", type: "video", completed: false },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case 'not-started': return <Badge variant="outline">Not Started</Badge>;
      default: return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'interactive': return <Play className="w-4 h-4" />;
      case 'quiz': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
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
          <BookOpen className="w-8 h-8 mr-3 text-accent-teal" />
          My Courses
        </h1>
        <p className="text-muted-foreground">
          Continue your genetics education with structured learning paths
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card className="glass p-6 hover:shadow-xl smooth-transition neural-glow">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Course Info */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold font-poppins mb-2">{course.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                        {getStatusBadge(course.status)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {course.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {course.students.toLocaleString()} students
                        </span>
                      </div>
                    </div>

                    {/* Progress & Actions */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center mb-3`}>
                          {course.status === 'completed' ? (
                            <CheckCircle className="w-8 h-8 text-white" />
                          ) : (
                            <span className="text-white font-bold text-lg">{course.progress}%</span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {course.completedModules}/{course.modules} modules
                        </div>
                      </div>

                      {course.progress > 0 && course.progress < 100 && (
                        <div className="space-y-2">
                          <Progress value={course.progress} className="h-2" />
                          <div className="text-xs text-center text-muted-foreground">
                            {course.progress}% complete
                          </div>
                        </div>
                      )}

                      <Button className={`w-full bg-gradient-to-r ${course.color} hover:scale-105 smooth-transition`}>
                        {course.status === 'completed' ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            View Certificate
                          </>
                        ) : course.status === 'in-progress' ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Start Course
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Progress */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Learning Progress
                </h3>
              </div>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">67%</div>
                  <div className="text-sm text-muted-foreground">Overall Progress</div>
                </div>
                <Progress value={67} className="h-3" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">31</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">15</div>
                    <div className="text-muted-foreground">In Progress</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Lessons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-secondary-purple" />
                  Recent Lessons
                </h3>
                <Button variant="ghost" size="sm" className="text-secondary-purple">
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 smooth-transition"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      lesson.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        getTypeIcon(lesson.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm line-clamp-1">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {lesson.duration} • {lesson.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Study Streak */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent-teal to-primary flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold font-poppins mb-2">Study Streak</h3>
                <div className="text-3xl font-bold text-accent-teal mb-1">12 days</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Keep it up! You're on a roll!
                </p>
                <Button variant="outline" className="w-full border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-white">
                  View Achievements
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}