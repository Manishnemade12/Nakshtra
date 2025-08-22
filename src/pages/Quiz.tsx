import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  HelpCircle, 
  CheckCircle, 
  XCircle,
  Clock,
  Star,
  Trophy,
  Brain,
  Target,
  Zap,
  RotateCcw,
  ArrowRight
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the complementary base pair to Adenine (A) in DNA?",
      options: ["Guanine (G)", "Cytosine (C)", "Thymine (T)", "Uracil (U)"],
      correctAnswer: 2,
      explanation: "In DNA, Adenine (A) always pairs with Thymine (T) through hydrogen bonding.",
      difficulty: 'Easy',
      topic: 'DNA Structure'
    },
    {
      id: 2,
      question: "During which phase of meiosis does crossing over occur?",
      options: ["Prophase I", "Metaphase I", "Anaphase I", "Prophase II"],
      correctAnswer: 0,
      explanation: "Crossing over occurs during Prophase I of meiosis, specifically during the pachytene stage.",
      difficulty: 'Medium',
      topic: 'Meiosis'
    },
    {
      id: 3,
      question: "If both parents are heterozygous for a trait (Aa), what percentage of offspring will be homozygous recessive?",
      options: ["0%", "25%", "50%", "75%"],
      correctAnswer: 1,
      explanation: "In a cross between two heterozygotes (Aa × Aa), 25% of offspring will be aa (homozygous recessive).",
      difficulty: 'Medium',
      topic: 'Inheritance'
    },
    {
      id: 4,
      question: "Which enzyme is responsible for joining DNA fragments during replication?",
      options: ["DNA Helicase", "DNA Polymerase", "DNA Ligase", "Primase"],
      correctAnswer: 2,
      explanation: "DNA Ligase joins the Okazaki fragments on the lagging strand to create a continuous DNA molecule.",
      difficulty: 'Hard',
      topic: 'DNA Replication'
    },
    {
      id: 5,
      question: "What type of mutation involves the insertion or deletion of nucleotides that is not divisible by three?",
      options: ["Point mutation", "Silent mutation", "Frameshift mutation", "Nonsense mutation"],
      correctAnswer: 2,
      explanation: "Frameshift mutations occur when insertions or deletions shift the reading frame of the genetic code.",
      difficulty: 'Hard',
      topic: 'Mutations'
    }
  ];

  const quizStats = [
    { label: "Total Quizzes", value: "47", icon: HelpCircle, color: "from-primary to-secondary-purple" },
    { label: "Average Score", value: "84%", icon: Target, color: "from-secondary-purple to-accent-teal" },
    { label: "Best Streak", value: "12", icon: Zap, color: "from-accent-teal to-primary" },
    { label: "Time Saved", value: "240min", icon: Clock, color: "from-primary to-accent-teal" },
  ];

  const recentQuizzes = [
    { topic: "DNA Structure", score: 90, difficulty: "Easy", date: "Today" },
    { topic: "Cell Division", score: 78, difficulty: "Medium", date: "Yesterday" },
    { topic: "Protein Synthesis", score: 95, difficulty: "Hard", date: "2 days ago" },
    { topic: "Inheritance Patterns", score: 82, difficulty: "Medium", date: "3 days ago" },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Quiz finished
        setShowResult(true);
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (currentQuestion >= questions.length && showResult) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <Card className="glass p-8 text-center neural-glow">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
                finalScore >= 80 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : finalScore >= 60 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
            >
              {finalScore >= 80 ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <Star className="w-12 h-12 text-white" />
              )}
            </motion.div>
            
            <h2 className="text-3xl font-bold font-poppins mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-teal bg-clip-text text-transparent">
              {finalScore}%
            </div>
            <p className="text-muted-foreground mb-6">
              You scored {score} out of {questions.length} questions correctly
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={restartQuiz}
                className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline">
                Review Answers
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
          <HelpCircle className="w-8 h-8 mr-3 text-accent-teal" />
          Genetics Quiz
        </h1>
        <p className="text-muted-foreground">
          Test your knowledge with AI-generated questions
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quiz Interface */}
        <div className="lg:col-span-2">
          {currentQuestion < questions.length ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="glass p-8">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className={getDifficultyColor(questions[currentQuestion].difficulty)}>
                        {questions[currentQuestion].difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-accent-teal border-accent-teal">
                        {questions[currentQuestion].topic}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={((currentQuestion) / questions.length) * 100} className="h-2" />
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold font-poppins mb-6">
                    {questions[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`p-4 cursor-pointer smooth-transition ${
                            selectedAnswer === index 
                              ? 'ring-2 ring-accent-teal bg-accent-teal/10' 
                              : 'hover:bg-muted/30'
                          } ${
                            showResult && index === questions[currentQuestion].correctAnswer
                              ? 'ring-2 ring-green-500 bg-green-50'
                              : showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer
                              ? 'ring-2 ring-red-500 bg-red-50'
                              : ''
                          }`}
                          onClick={() => !showResult && handleAnswerSelect(index)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswer === index 
                                ? 'border-accent-teal bg-accent-teal' 
                                : 'border-muted-foreground'
                            } ${
                              showResult && index === questions[currentQuestion].correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer
                                ? 'border-red-500 bg-red-500'
                                : ''
                            }`}>
                              {showResult && index === questions[currentQuestion].correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-white" />
                              )}
                              {showResult && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                                <XCircle className="w-4 h-4 text-white" />
                              )}
                              {selectedAnswer === index && !showResult && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200"
                    >
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2" />
                        Explanation
                      </h4>
                      <p className="text-blue-700 text-sm">
                        {questions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controls */}
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                  </div>
                  <div className="space-x-2">
                    {!showResult && selectedAnswer !== null && (
                      <Button variant="outline" onClick={handleShowResult}>
                        Show Answer
                      </Button>
                    )}
                    <Button 
                      onClick={handleNext}
                      disabled={selectedAnswer === null && !showResult}
                      className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal"
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-6">Quiz Statistics</h3>
              <div className="space-y-4">
                {quizStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-6">Recent Quizzes</h3>
              <div className="space-y-3">
                {recentQuizzes.map((quiz, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 smooth-transition"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">{quiz.topic}</div>
                      <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                        <span className="text-xs text-muted-foreground">{quiz.date}</span>
                      </div>
                    </div>
                    <div className={`font-bold ${getScoreColor(quiz.score)}`}>
                      {quiz.score}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}