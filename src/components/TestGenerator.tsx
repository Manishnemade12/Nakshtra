// // import React, { useState } from 'react';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Progress } from '@/components/ui/progress';
// // import { CheckCircle, AlertCircle, BookOpen, Zap, Mail, Settings } from 'lucide-react';
// // import { useToast } from '@/hooks/use-toast';
// // import emailjs from '@emailjs/browser';

// // interface Question {
// //   id: string;
// //   question: string;
// //   options: string[];
// //   correctAnswer: number;
// //   explanation: string;
// // }

// // interface TestResult {
// //   score: number;
// //   totalQuestions: number;
// //   percentage: number;
// //   answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
// //   subject: string;
// //   completedAt: Date;
// // }

// // const SUBJECTS = [
// //   { id: 'mathematics', name: 'Mathematics', icon: '📐' },
// //   { id: 'physics', name: 'Physics', icon: '🔬' },
// //   { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
// //   { id: 'biology', name: 'Biology', icon: '🧬' },
// //   { id: 'computer_science', name: 'Computer Science', icon: '💻' },
// //   { id: 'history', name: 'History', icon: '📚' },
// //   { id: 'literature', name: 'Literature', icon: '📖' },
// //   { id: 'geography', name: 'Geography', icon: '🌍' },
// //   { id: 'economics', name: 'Economics', icon: '📊' },
// //   { id: 'psychology', name: 'Psychology', icon: '🧠' }
// // ];

// // export const TestGenerator: React.FC = () => {
// //   const [step, setStep] = useState<'setup' | 'config' | 'taking' | 'results'>('setup');
// //   const [selectedSubject, setSelectedSubject] = useState<string>('');
// //   const [difficulty, setDifficulty] = useState<string>('');
// //   const [questionCount, setQuestionCount] = useState<string>('10');
// //   const [studentEmail, setStudentEmail] = useState<string>('');
// //   const [studentName, setStudentName] = useState<string>('');
  
// //   // API Configuration
// //   const [geminiApiKey, setGeminiApiKey] = useState<string>('');
// //   const [emailjsServiceId, setEmailjsServiceId] = useState<string>('');
// //   const [emailjsTemplateId, setEmailjsTemplateId] = useState<string>('');
// //   const [emailjsPublicKey, setEmailjsPublicKey] = useState<string>('');
  
// //   // Test State
// //   const [questions, setQuestions] = useState<Question[]>([]);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
// //   const [answers, setAnswers] = useState<{ [key: string]: number }>({});
// //   const [testResult, setTestResult] = useState<TestResult | null>(null);
// //   const [isGenerating, setIsGenerating] = useState<boolean>(false);
// //   const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

// //   const { toast } = useToast();

// //   // const generateTest = async () => {
// //   //   if (!geminiApiKey) {
// //   //     toast({
// //   //       title: "API Key Required",
// //   //       description: "Please enter your Gemini API key to generate the test.",
// //   //       variant: "destructive"
// //   //     });
// //   //     return;
// //   //   }

// //   //   setIsGenerating(true);
// //   //   try {
// //   //     const prompt = `Generate ${questionCount} multiple-choice questions for ${selectedSubject} at ${difficulty} difficulty level. 
      
// //   //     Return the response in JSON format with the following structure:
// //   //     {
// //   //       "questions": [
// //   //         {
// //   //           "id": "q1",
// //   //           "question": "Question text here",
// //   //           "options": ["Option A", "Option B", "Option C", "Option D"],
// //   //           "correctAnswer": 0,
// //   //           "explanation": "Brief explanation of the correct answer"
// //   //         }
// //   //       ]
// //   //     }
      
// //   //     Make sure questions are educational, accurate, and appropriate for the difficulty level.`;

// //   //     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
// //   //       method: 'POST',
// //   //       headers: {
// //   //         'Content-Type': 'application/json',
// //   //       },
// //   //       body: JSON.stringify({
// //   //         contents: [{
// //   //           parts: [{
// //   //             text: prompt
// //   //           }]
// //   //         }]
// //   //       })
// //   //     });

// //   //     if (!response.ok) {
// //   //       throw new Error(`API request failed: ${response.statusText}`);
// //   //     }

// //   //     const data = await response.json();
// //   //     const generatedText = data.candidates[0].content.parts[0].text;
      
// //   //     // Extract JSON from the response
// //   //     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
// //   //     if (!jsonMatch) {
// //   //       throw new Error("Could not parse JSON from response");
// //   //     }

// //   //     const questionsData = JSON.parse(jsonMatch[0]);
// //   //     setQuestions(questionsData.questions);
// //   //     setStep('taking');
      
// //   //     toast({
// //   //       title: "Test Generated Successfully!",
// //   //       description: `Generated ${questionsData.questions.length} questions for ${selectedSubject}.`
// //   //     });
// //   //   } catch (error) {
// //   //     console.error('Error generating test:', error);
// //   //     toast({
// //   //       title: "Generation Failed",
// //   //       description: "Failed to generate test. Please check your API key and try again.",
// //   //       variant: "destructive"
// //   //     });
// //   //   } finally {
// //   //     setIsGenerating(false);
// //   //   }
// //   // };

// // const generateTest = async () => {
// //   setIsGenerating(true);
// //   try {
// //     const prompt = `Generate ${questionCount} multiple-choice questions for ${selectedSubject} at ${difficulty} difficulty level. 
      
// //     Return the response in JSON format with the following structure:
// //     {
// //       "questions": [
// //         {
// //           "id": "q1",
// //           "question": "Question text here",
// //           "options": ["Option A", "Option B", "Option C", "Option D"],
// //           "correctAnswer": 0,
// //           "explanation": "Brief explanation of the correct answer"
// //         }
// //       ]
// //     }
    
// //     Make sure questions are educational, accurate, and appropriate for the difficulty level.`;

// //     const response = await fetch(
// //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDR6kzuVXzuqC4h0NOupigXPoprJjPo7KE`,
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           contents: [
// //             {
// //               parts: [
// //                 {
// //                   text: prompt,
// //                 },
// //               ],
// //             },
// //           ],
// //         }),
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error(`API request failed: ${response.statusText}`);
// //     }

// //     const data = await response.json();
// //     const generatedText = data.candidates[0].content.parts[0].text;

// //     // Extract JSON from the response
// //     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
// //     if (!jsonMatch) {
// //       throw new Error("Could not parse JSON from response");
// //     }

// //     const questionsData = JSON.parse(jsonMatch[0]);
// //     setQuestions(questionsData.questions);
// //     setStep("taking");

// //     toast({
// //       title: "Test Generated Successfully!",
// //       description: `Generated ${questionsData.questions.length} questions for ${selectedSubject}.`,
// //     });
// //   } catch (error) {
// //     console.error("Error generating test:", error);
// //     toast({
// //       title: "Generation Failed",
// //       description:
// //         "Failed to generate test. Please try again later.",
// //       variant: "destructive",
// //     });
// //   } finally {
// //     setIsGenerating(false);
// //   }
// // };




// //   const handleAnswerSelect = (questionId: string, answerIndex: number) => {
// //     setAnswers(prev => ({
// //       ...prev,
// //       [questionId]: answerIndex
// //     }));
// //   };

// //   const calculateResults = (): TestResult => {
// //     let correctCount = 0;
// //     const detailedAnswers = questions.map(question => {
// //       const selectedAnswer = answers[question.id] ?? -1;
// //       const isCorrect = selectedAnswer === question.correctAnswer;
// //       if (isCorrect) correctCount++;
      
// //       return {
// //         questionId: question.id,
// //         selectedAnswer,
// //         isCorrect
// //       };
// //     });

// //     const percentage = Math.round((correctCount / questions.length) * 100);
    
// //     return {
// //       score: correctCount,
// //       totalQuestions: questions.length,
// //       percentage,
// //       answers: detailedAnswers,
// //       subject: SUBJECTS.find(s => s.id === selectedSubject)?.name || selectedSubject,
// //       completedAt: new Date()
// //     };
// //   };

// //   const submitTest = async () => {
// //     const result = calculateResults();
// //     setTestResult(result);
// //     setStep('results');

// //     // Send email with results
// //     if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey && studentEmail) {
// //       setIsSendingEmail(true);
// //       try {
// //         await emailjs.send(
// //           emailjsServiceId,
// //           emailjsTemplateId,
// //           {
// //             to_name: studentName || 'Student',
// //             to_email: studentEmail,
// //             subject: result.subject,
// //             score: result.score,
// //             total_questions: result.totalQuestions,
// //             percentage: result.percentage,
// //             message: `Congratulations on completing your ${result.subject} test! You scored ${result.score} out of ${result.totalQuestions} questions (${result.percentage}%).`
// //           },
// //           emailjsPublicKey
// //         );
        
// //         toast({
// //           title: "Results Sent!",
// //           description: `Test results have been sent to ${studentEmail}`
// //         });
// //       } catch (error) {
// //         console.error('Email sending failed:', error);
// //         toast({
// //           title: "Email Failed",
// //           description: "Test completed but email sending failed. Please check your EmailJS configuration.",
// //           variant: "destructive"
// //         });
// //       } finally {
// //         setIsSendingEmail(false);
// //       }
// //     }
// //   };

// //   if (step === 'setup') {
// //     return (
// //       <div className="min-h-screen bg-background p-6">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="text-center mb-12 animate-fade-in">
// //             <div className="flex items-center justify-center mb-6">
// //               <div className="p-4 rounded-full bg-gradient-to-r from-primary to-primary-glow">
// //                 <BookOpen className="h-8 w-8 text-primary-foreground" />
// //               </div>
// //             </div>
// //             <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
// //               AI-Powered Test Generator
// //             </h1>
// //             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
// //               Select your subject and let AI create a personalized test tailored to your learning needs
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
// //             {SUBJECTS.map((subject) => (
// //               <Card
// //                 key={subject.id}
// //                 className={`card-subject ${selectedSubject === subject.id ? 'ring-2 ring-primary shadow-glow' : ''}`}
// //                 onClick={() => setSelectedSubject(subject.id)}
// //               >
// //                 <CardContent className="flex flex-col items-center p-6">
// //                   <div className="text-4xl mb-3">{subject.icon}</div>
// //                   <h3 className="font-semibold text-center">{subject.name}</h3>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>

// //           {selectedSubject && (
// //             <Card className="card-elevated animate-slide-up">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Settings className="h-5 w-5" />
// //                   Test Configuration
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Customize your test parameters
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent className="space-y-6">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="student-name">Your Name</Label>
// //                     <Input
// //                       id="student-name"
// //                       placeholder="Enter your name"
// //                       value={studentName}
// //                       onChange={(e) => setStudentName(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="student-email">Email Address</Label>
// //                     <Input
// //                       id="student-email"
// //                       type="email"
// //                       placeholder="your.email@example.com"
// //                       value={studentEmail}
// //                       onChange={(e) => setStudentEmail(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="difficulty">Difficulty Level</Label>
// //                     <Select value={difficulty} onValueChange={setDifficulty}>
// //                       <SelectTrigger>
// //                         <SelectValue placeholder="Select difficulty" />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="beginner">Beginner</SelectItem>
// //                         <SelectItem value="intermediate">Intermediate</SelectItem>
// //                         <SelectItem value="advanced">Advanced</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="questions">Number of Questions</Label>
// //                     <Select value={questionCount} onValueChange={setQuestionCount}>
// //                       <SelectTrigger>
// //                         <SelectValue />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         <SelectItem value="5">5 Questions</SelectItem>
// //                         <SelectItem value="10">10 Questions</SelectItem>
// //                         <SelectItem value="15">15 Questions</SelectItem>
// //                         <SelectItem value="20">20 Questions</SelectItem>
// //                       </SelectContent>
// //                     </Select>
// //                   </div>
// //                 </div>

// //                 <div className="flex justify-end pt-4">
// //                   <Button 
// //                     onClick={() => setStep('config')}
// //                     disabled={!selectedSubject || !difficulty || !studentEmail}
// //                     className="btn-hero"
// //                   >
// //                     Configure API Keys
// //                     <Zap className="ml-2 h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (step === 'config') {
// //     return (
// //       <div className="min-h-screen bg-background p-6">
// //         <div className="max-w-2xl mx-auto">
// //           <div className="text-center mb-8">
// //             <h2 className="text-3xl font-bold mb-4">API Configuration</h2>
// //             <p className="text-muted-foreground">
// //               Enter your API keys to enable test generation and email functionality
// //             </p>
// //           </div>

// //           <Card className="card-elevated">
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Settings className="h-5 w-5" />
// //                 API Keys Setup
// //               </CardTitle>
// //               <CardDescription>
// //                 Your API keys are stored locally and never shared
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               <div className="space-y-2">
// //                 <Label htmlFor="gemini-key">Gemini API Key *</Label>
// //                 <Input
// //                   id="gemini-key"
// //                   type="password"
// //                   placeholder="Enter your Gemini API key"
// //                   value={geminiApiKey}
// //                   onChange={(e) => setGeminiApiKey(e.target.value)}
// //                 />
// //                 <p className="text-sm text-muted-foreground">
// //                   Get your API key from Google AI Studio
// //                 </p>
// //               </div>

// //               <div className="border rounded-lg p-4 space-y-4">
// //                 <h4 className="font-medium flex items-center gap-2">
// //                   <Mail className="h-4 w-4" />
// //                   EmailJS Configuration (Optional)
// //                 </h4>
// //                 <div className="grid grid-cols-1 gap-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="service-id">Service ID</Label>
// //                     <Input
// //                       id="service-id"
// //                       placeholder="Your EmailJS Service ID"
// //                       value={emailjsServiceId}
// //                       onChange={(e) => setEmailjsServiceId(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="template-id">Template ID</Label>
// //                     <Input
// //                       id="template-id"
// //                       placeholder="Your EmailJS Template ID"
// //                       value={emailjsTemplateId}
// //                       onChange={(e) => setEmailjsTemplateId(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="space-y-2">
// //                     <Label htmlFor="public-key">Public Key</Label>
// //                     <Input
// //                       id="public-key"
// //                       placeholder="Your EmailJS Public Key"
// //                       value={emailjsPublicKey}
// //                       onChange={(e) => setEmailjsPublicKey(e.target.value)}
// //                     />
// //                   </div>
// //                 </div>
// //                 <p className="text-sm text-muted-foreground">
// //                   Configure EmailJS to automatically send test results via email
// //                 </p>
// //               </div>

// //               <div className="flex gap-3 pt-4">
// //                 <Button variant="outline" onClick={() => setStep('setup')}>
// //                   Back
// //                 </Button>
// //                 <Button 
// //                   onClick={generateTest}
// //                   disabled={!geminiApiKey || isGenerating}
// //                   className="btn-hero flex-1"
// //                 >
// //                   {isGenerating ? 'Generating Test...' : 'Generate Test'}
// //                   <Zap className="ml-2 h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (step === 'taking') {
// //     const currentQuestion = questions[currentQuestionIndex];
// //     const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

// //     return (
// //       <div className="min-h-screen bg-background p-6">
// //         <div className="max-w-3xl mx-auto">
// //           <div className="mb-8">
// //             <div className="flex items-center justify-between mb-4">
// //               <h2 className="text-2xl font-bold">
// //                 Question {currentQuestionIndex + 1} of {questions.length}
// //               </h2>
// //               <div className="text-sm text-muted-foreground">
// //                 {SUBJECTS.find(s => s.id === selectedSubject)?.name} • {difficulty}
// //               </div>
// //             </div>
// //             <Progress value={progress} className="h-2" />
// //           </div>

// //           <Card className="card-elevated mb-8">
// //             <CardHeader>
// //               <CardTitle className="text-xl leading-relaxed">
// //                 {currentQuestion?.question}
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-3">
// //               {currentQuestion?.options.map((option, index) => (
// //                 <div
// //                   key={index}
// //                   className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
// //                     answers[currentQuestion.id] === index
// //                       ? 'border-primary bg-accent shadow-md'
// //                       : 'border-border hover:border-primary/50 hover:bg-accent/50'
// //                   }`}
// //                   onClick={() => handleAnswerSelect(currentQuestion.id, index)}
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
// //                       answers[currentQuestion.id] === index
// //                         ? 'border-primary bg-primary text-primary-foreground'
// //                         : 'border-muted-foreground'
// //                     }`}>
// //                       {answers[currentQuestion.id] === index && (
// //                         <CheckCircle className="h-4 w-4" />
// //                       )}
// //                     </div>
// //                     <span className="flex-1">{option}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </CardContent>
// //           </Card>

// //           <div className="flex justify-between">
// //             <Button
// //               variant="outline"
// //               onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
// //               disabled={currentQuestionIndex === 0}
// //             >
// //               Previous
// //             </Button>
            
// //             {currentQuestionIndex === questions.length - 1 ? (
// //               <Button 
// //                 onClick={submitTest}
// //                 disabled={Object.keys(answers).length !== questions.length}
// //                 className="btn-success"
// //               >
// //                 Submit Test
// //               </Button>
// //             ) : (
// //               <Button
// //                 onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
// //                 disabled={!answers.hasOwnProperty(currentQuestion?.id)}
// //                 className="btn-hero"
// //               >
// //                 Next
// //               </Button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (step === 'results' && testResult) {
// //     return (
// //       <div className="min-h-screen bg-background p-6">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="text-center mb-8 animate-fade-in">
// //             <div className="flex items-center justify-center mb-6">
// //               <div className={`p-4 rounded-full ${
// //                 testResult.percentage >= 70 ? 'bg-success' : 'bg-warning'
// //               }`}>
// //                 {testResult.percentage >= 70 ? (
// //                   <CheckCircle className="h-8 w-8 text-success-foreground" />
// //                 ) : (
// //                   <AlertCircle className="h-8 w-8 text-warning-foreground" />
// //                 )}
// //               </div>
// //             </div>
// //             <h1 className="text-4xl font-bold mb-4">Test Completed!</h1>
// //             <p className="text-xl text-muted-foreground">
// //               Here are your results for {testResult.subject}
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //             <Card className="card-elevated text-center">
// //               <CardContent className="p-6">
// //                 <div className="text-3xl font-bold text-primary mb-2">
// //                   {testResult.score}
// //                 </div>
// //                 <div className="text-muted-foreground">Correct Answers</div>
// //               </CardContent>
// //             </Card>
// //             <Card className="card-elevated text-center">
// //               <CardContent className="p-6">
// //                 <div className="text-3xl font-bold text-primary mb-2">
// //                   {testResult.totalQuestions}
// //                 </div>
// //                 <div className="text-muted-foreground">Total Questions</div>
// //               </CardContent>
// //             </Card>
// //             <Card className="card-elevated text-center">
// //               <CardContent className="p-6">
// //                 <div className={`text-3xl font-bold mb-2 ${
// //                   testResult.percentage >= 70 ? 'text-success' : 'text-warning'
// //                 }`}>
// //                   {testResult.percentage}%
// //                 </div>
// //                 <div className="text-muted-foreground">Final Score</div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {isSendingEmail && (
// //             <Card className="card-elevated mb-6">
// //               <CardContent className="flex items-center gap-3 p-4">
// //                 <Mail className="h-5 w-5 animate-bounce-subtle" />
// //                 <span>Sending results to your email...</span>
// //               </CardContent>
// //             </Card>
// //           )}

// //           <div className="flex gap-4 justify-center">
// //             <Button 
// //               onClick={() => {
// //                 setStep('setup');
// //                 setQuestions([]);
// //                 setAnswers({});
// //                 setTestResult(null);
// //                 setCurrentQuestionIndex(0);
// //               }}
// //               className="btn-hero"
// //             >
// //               Take Another Test
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return null;
// // };

// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Progress } from '@/components/ui/progress';
// import { CheckCircle, AlertCircle, BookOpen, Zap, Mail, Brain, Sparkles } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import emailjs from '@emailjs/browser';

// // API Configuration
// const GEMINI_API_KEY = "AIzaSyDR6kzuVXzuqC4h0NOupigXPoprJjPo7KE";
// const EMAILJS_SERVICE_ID = "service_y6sfrds";
// const EMAILJS_TEMPLATE_ID = "template_quiz_results";
// const EMAILJS_PUBLIC_KEY = "Tx9JW4ZdP6B9z7VQI";

// interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   explanation: string;
// }

// interface TestResult {
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
//   subject: string;
//   completedAt: Date;
// }

// export const TestGenerator: React.FC = () => {
//   const [step, setStep] = useState<'setup' | 'taking' | 'results'>('setup');
//   const [customSubject, setCustomSubject] = useState<string>('');
//   const [difficulty, setDifficulty] = useState<string>('');
//   const [questionCount, setQuestionCount] = useState<string>('10');
//   const [studentEmail, setStudentEmail] = useState<string>('');
//   const [studentName, setStudentName] = useState<string>('');
  
//   // Test State
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
//   const [answers, setAnswers] = useState<{ [key: string]: number }>({});
//   const [testResult, setTestResult] = useState<TestResult | null>(null);
//   const [isGenerating, setIsGenerating] = useState<boolean>(false);
//   const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

//   const { toast } = useToast();

//   const generateTest = async () => {
//     if (!customSubject.trim()) {
//       toast({
//         title: "Subject Required",
//         description: "Please enter a subject for your test.",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsGenerating(true);
//     try {
//       const prompt = `Generate ${questionCount} multiple-choice questions for ${customSubject} at ${difficulty} difficulty level. 
      
//       Return the response in JSON format with the following structure:
//       {
//         "questions": [
//           {
//             "id": "q1",
//             "question": "Question text here",
//             "options": ["Option A", "Option B", "Option C", "Option D"],
//             "correctAnswer": 0,
//             "explanation": "Brief explanation of the correct answer"
//           }
//         ]
//       }
      
//       Make sure questions are educational, accurate, and appropriate for the difficulty level.`;

//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: prompt,
//                   },
//                 ],
//               },
//             ],
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`API request failed: ${response.statusText}`);
//       }

//       const data = await response.json();
//       const generatedText = data.candidates[0].content.parts[0].text;

//       // Extract JSON from the response
//       const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//       if (!jsonMatch) {
//         throw new Error("Could not parse JSON from response");
//       }

//       const questionsData = JSON.parse(jsonMatch[0]);
//       setQuestions(questionsData.questions);
//       setStep("taking");

//       toast({
//         title: "Test Generated Successfully!",
//         description: `Generated ${questionsData.questions.length} questions for ${customSubject}.`,
//       });
//     } catch (error) {
//       console.error("Error generating test:", error);
//       toast({
//         title: "Generation Failed",
//         description: "Failed to generate test. Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleAnswerSelect = (questionId: string, answerIndex: number) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answerIndex
//     }));
//   };

//   const calculateResults = (): TestResult => {
//     let correctCount = 0;
//     const detailedAnswers = questions.map(question => {
//       const selectedAnswer = answers[question.id] ?? -1;
//       const isCorrect = selectedAnswer === question.correctAnswer;
//       if (isCorrect) correctCount++;
      
//       return {
//         questionId: question.id,
//         selectedAnswer,
//         isCorrect
//       };
//     });

//     const percentage = Math.round((correctCount / questions.length) * 100);
    
//     return {
//       score: correctCount,
//       totalQuestions: questions.length,
//       percentage,
//       answers: detailedAnswers,
//       subject: customSubject,
//       completedAt: new Date()
//     };
//   };

//   const submitTest = async () => {
//     const result = calculateResults();
//     setTestResult(result);
//     setStep('results');

//     // Send email with results if email is provided
//     if (studentEmail) {
//       setIsSendingEmail(true);
//       try {
//         await emailjs.send(
//           EMAILJS_SERVICE_ID,
//           EMAILJS_TEMPLATE_ID,
//           {
//             to_name: studentName || 'Student',
//             to_email: studentEmail,
//             subject: result.subject,
//             score: result.score,
//             total_questions: result.totalQuestions,
//             percentage: result.percentage,
//             message: `Congratulations on completing your ${result.subject} test! You scored ${result.score} out of ${result.totalQuestions} questions (${result.percentage}%).`
//           },
//           EMAILJS_PUBLIC_KEY
//         );
        
//         toast({
//           title: "Results Sent!",
//           description: `Test results have been sent to ${studentEmail}`
//         });
//       } catch (error) {
//         console.error('Email sending failed:', error);
//         toast({
//           title: "Email Failed",
//           description: "Test completed but email sending failed.",
//           variant: "destructive"
//         });
//       } finally {
//         setIsSendingEmail(false);
//       }
//     }
//   };

//   if (step === 'setup') {
//     return (
//       <div className="min-h-screen bg-background p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12 animate-fade-in">
//             <div className="flex items-center justify-center mb-6">
//               <div className="p-4 rounded-full bg-gradient-primary shadow-glow">
//                 <Brain className="h-8 w-8 text-primary-foreground" />
//               </div>
//             </div>
//             <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
//               AI Quiz Generator
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Enter any subject and let our AI create personalized quiz questions tailored to your learning needs
//             </p>
//           </div>

//           <Card className="card-elevated animate-slide-up max-w-2xl mx-auto">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Sparkles className="h-6 w-6 text-primary" />
//                 Create Your Quiz
//               </CardTitle>
//               <CardDescription>
//                 Configure your personalized learning experience
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="subject" className="text-base font-medium">Subject or Topic</Label>
//                 <Input
//                   id="subject"
//                   placeholder="e.g., Advanced React Hooks, World War II, Quantum Physics, Machine Learning..."
//                   value={customSubject}
//                   onChange={(e) => setCustomSubject(e.target.value)}
//                   className="text-base py-3"
//                 />
//                 <p className="text-sm text-muted-foreground">
//                   Enter any subject, topic, or skill you want to test your knowledge on
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="student-name">Your Name (Optional)</Label>
//                   <Input
//                     id="student-name"
//                     placeholder="Enter your name"
//                     value={studentName}
//                     onChange={(e) => setStudentName(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="student-email">Email (Optional)</Label>
//                   <Input
//                     id="student-email"
//                     type="email"
//                     placeholder="your.email@example.com"
//                     value={studentEmail}
//                     onChange={(e) => setStudentEmail(e.target.value)}
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     Get your results via email
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="difficulty">Difficulty Level</Label>
//                   <Select value={difficulty} onValueChange={setDifficulty}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select difficulty" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="beginner">🌱 Beginner</SelectItem>
//                       <SelectItem value="intermediate">🚀 Intermediate</SelectItem>
//                       <SelectItem value="advanced">🔥 Advanced</SelectItem>
//                       <SelectItem value="expert">💎 Expert</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="questions">Number of Questions</Label>
//                   <Select value={questionCount} onValueChange={setQuestionCount}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">5 Questions</SelectItem>
//                       <SelectItem value="10">10 Questions</SelectItem>
//                       <SelectItem value="15">15 Questions</SelectItem>
//                       <SelectItem value="20">20 Questions</SelectItem>
//                       <SelectItem value="25">25 Questions</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="flex justify-center pt-6">
//                 <Button 
//                   onClick={generateTest}
//                   disabled={!customSubject.trim() || !difficulty || isGenerating}
//                   className="btn-hero text-lg px-8 py-3"
//                   size="lg"
//                 >
//                   {isGenerating ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Generating Quiz...
//                     </>
//                   ) : (
//                     <>
//                       Generate Quiz
//                       <Zap className="ml-2 h-5 w-5" />
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   if (step === 'taking') {
//     const currentQuestion = questions[currentQuestionIndex];
//     const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

//     return (
//       <div className="min-h-screen bg-background p-6">
//         <div className="max-w-3xl mx-auto">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold">
//                 Question {currentQuestionIndex + 1} of {questions.length}
//               </h2>
//               <div className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full">
//                 {customSubject} • {difficulty}
//               </div>
//             </div>
//             <Progress value={progress} className="h-3" />
//           </div>

//           <Card className="card-elevated mb-8">
//             <CardHeader>
//               <CardTitle className="text-xl leading-relaxed">
//                 {currentQuestion?.question}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {currentQuestion?.options.map((option, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
//                     answers[currentQuestion.id] === index
//                       ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
//                       : 'border-border hover:border-primary/50 hover:bg-accent/50'
//                   }`}
//                   onClick={() => handleAnswerSelect(currentQuestion.id, index)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                       answers[currentQuestion.id] === index
//                         ? 'border-primary bg-primary text-primary-foreground'
//                         : 'border-muted-foreground'
//                     }`}>
//                       {answers[currentQuestion.id] === index && (
//                         <CheckCircle className="h-4 w-4" />
//                       )}
//                     </div>
//                     <span className="flex-1">{option}</span>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <div className="flex justify-between">
//             <Button
//               variant="outline"
//               onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
//               disabled={currentQuestionIndex === 0}
//               size="lg"
//             >
//               Previous
//             </Button>
            
//             {currentQuestionIndex === questions.length - 1 ? (
//               <Button 
//                 onClick={submitTest}
//                 disabled={Object.keys(answers).length !== questions.length}
//                 className="btn-success"
//                 size="lg"
//               >
//                 Submit Quiz
//                 <CheckCircle className="ml-2 h-5 w-5" />
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
//                 disabled={!answers.hasOwnProperty(currentQuestion?.id)}
//                 className="btn-hero"
//                 size="lg"
//               >
//                 Next
//                 <Zap className="ml-2 h-5 w-5" />
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (step === 'results' && testResult) {
//     const getGradeColor = (percentage: number) => {
//       if (percentage >= 90) return 'text-emerald-400';
//       if (percentage >= 80) return 'text-green-400';
//       if (percentage >= 70) return 'text-yellow-400';
//       if (percentage >= 60) return 'text-orange-400';
//       return 'text-red-400';
//     };

//     const getGradeEmoji = (percentage: number) => {
//       if (percentage >= 90) return '🏆';
//       if (percentage >= 80) return '🎉';
//       if (percentage >= 70) return '👏';
//       if (percentage >= 60) return '👍';
//       return '💪';
//     };

//     return (
//       <div className="min-h-screen bg-background p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-8 animate-fade-in">
//             <div className="flex items-center justify-center mb-6">
//               <div className={`p-6 rounded-full ${
//                 testResult.percentage >= 70 ? 'bg-gradient-success' : 'bg-gradient-to-r from-orange-500 to-red-500'
//               } shadow-glow`}>
//                 <span className="text-4xl">
//                   {getGradeEmoji(testResult.percentage)}
//                 </span>
//               </div>
//             </div>
//             <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
//             <p className="text-xl text-muted-foreground">
//               Here are your results for <span className="text-primary font-semibold">{testResult.subject}</span>
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <Card className="card-elevated text-center">
//               <CardContent className="p-6">
//                 <div className="text-4xl font-bold text-primary mb-2">
//                   {testResult.score}
//                 </div>
//                 <div className="text-muted-foreground">Correct Answers</div>
//               </CardContent>
//             </Card>
//             <Card className="card-elevated text-center">
//               <CardContent className="p-6">
//                 <div className="text-4xl font-bold text-primary mb-2">
//                   {testResult.totalQuestions}
//                 </div>
//                 <div className="text-muted-foreground">Total Questions</div>
//               </CardContent>
//             </Card>
//             <Card className="card-elevated text-center">
//               <CardContent className="p-6">
//                 <div className={`text-4xl font-bold mb-2 ${getGradeColor(testResult.percentage)}`}>
//                   {testResult.percentage}%
//                 </div>
//                 <div className="text-muted-foreground">Final Score</div>
//               </CardContent>
//             </Card>
//           </div>

//           {isSendingEmail && (
//             <Card className="card-elevated mb-6">
//               <CardContent className="flex items-center gap-3 p-4">
//                 <Mail className="h-5 w-5 animate-bounce-subtle text-primary" />
//                 <span>Sending results to your email...</span>
//               </CardContent>
//             </Card>
//           )}

//           <div className="flex gap-4 justify-center">
//             <Button 
//               onClick={() => {
//                 setStep('setup');
//                 setQuestions([]);
//                 setAnswers({});
//                 setTestResult(null);
//                 setCurrentQuestionIndex(0);
//                 setCustomSubject('');
//               }}
//               className="btn-hero"
//               size="lg"
//             >
//               Create New Quiz
//               <Sparkles className="ml-2 h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, AlertCircle, BookOpen, Zap, Mail, Brain, Sparkles, Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

// API Configuration
const GEMINI_API_KEY = "AIzaSyDR6kzuVXzuqC4h0NOupigXPoprJjPo7KE";
const EMAILJS_SERVICE_ID = "service_y6sfrds";
const EMAILJS_TEMPLATE_ID = "template_quiz_results";
const EMAILJS_PUBLIC_KEY = "Tx9JW4ZdP6B9z7VQI";

// Add type declarations for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "input" | "textarea";
  id?: string;
}

const VoiceInput = ({ value, onChange, placeholder, type = "input", id }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          onChange(value + finalTranscript + ' ');
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice Input Error",
          description: "Unable to process voice input. Please try again.",
          variant: "destructive"
        });
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [value, onChange, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      toast({
        title: "Voice Input Active 🎤",
        description: "Start speaking... Click the mic again to stop.",
      });
    }
  };

  const InputComponent = type === "textarea" ? Textarea : Input;

  return (
    <div className="relative">
      <InputComponent
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-12"
        rows={type === "textarea" ? 3 : undefined}
      />
      {isSupported && (
        <Button
          type="button"
          size="sm"
          variant={isListening ? "default" : "outline"}
          className={`absolute right-2 top-2 h-8 w-8 p-0 ${
            isListening 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse" 
              : "hover:bg-primary hover:text-primary-foreground"
          }`}
          onClick={toggleListening}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}
      {!isSupported && (
        <div className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: { questionId: string; selectedAnswer: number; isCorrect: boolean }[];
  subject: string;
  completedAt: Date;
}

export const TestGenerator: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'taking' | 'results'>('setup');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<string>('10');
  const [studentEmail, setStudentEmail] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  
  // Test State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);

  const { toast } = useToast();

  const generateTest = async () => {
    if (!customSubject.trim()) {
      toast({
        title: "Subject Required",
        description: "Please enter a subject for your test.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Generate ${questionCount} multiple-choice questions for ${customSubject} at ${difficulty} difficulty level. 
      
      Return the response in JSON format with the following structure:
      {
        "questions": [
          {
            "id": "q1",
            "question": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "explanation": "Brief explanation of the correct answer"
          }
        ]
      }
      
      Make sure questions are educational, accurate, and appropriate for the difficulty level.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse JSON from response");
      }

      const questionsData = JSON.parse(jsonMatch[0]);
      setQuestions(questionsData.questions);
      setStep("taking");

      toast({
        title: "Test Generated Successfully!",
        description: `Generated ${questionsData.questions.length} questions for ${customSubject}.`,
      });
    } catch (error) {
      console.error("Error generating test:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate test. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateResults = (): TestResult => {
    let correctCount = 0;
    const detailedAnswers = questions.map(question => {
      const selectedAnswer = answers[question.id] ?? -1;
      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    
    return {
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      answers: detailedAnswers,
      subject: customSubject,
      completedAt: new Date()
    };
  };

  const submitTest = async () => {
    const result = calculateResults();
    setTestResult(result);
    setStep('results');

    // Send email with results if email is provided
    if (studentEmail) {
      setIsSendingEmail(true);
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_name: studentName || 'Student',
            to_email: studentEmail,
            subject: result.subject,
            score: result.score,
            total_questions: result.totalQuestions,
            percentage: result.percentage,
            message: `Congratulations on completing your ${result.subject} test! You scored ${result.score} out of ${result.totalQuestions} questions (${result.percentage}%).`
          },
          EMAILJS_PUBLIC_KEY
        );
        
        toast({
          title: "Results Sent!",
          description: `Test results have been sent to ${studentEmail}`
        });
      } catch (error) {
        console.error('Email sending failed:', error);
        toast({
          title: "Email Failed",
          description: "Test completed but email sending failed.",
          variant: "destructive"
        });
      } finally {
        setIsSendingEmail(false);
      }
    }
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-primary shadow-glow">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AI Quiz Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter any subject and let our AI create personalized quiz questions with voice input support
            </p>
          </div>

          <Card className="card-elevated animate-slide-up max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Create Your Quiz
              </CardTitle>
              <CardDescription>
                Configure your personalized learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject or Topic * 
                  <span className="text-muted-foreground ml-1">(Try voice input!)</span>
                </Label>
                <VoiceInput
                  id="subject"
                  placeholder="e.g., Advanced React Hooks, World War II, Quantum Physics, Machine Learning..."
                  value={customSubject}
                  onChange={(value) => setCustomSubject(value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter any subject, topic, or skill you want to test your knowledge on
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="student-name">
                    Your Name (Optional)
                    <span className="text-muted-foreground ml-1">(Voice supported)</span>
                  </Label>
                  <VoiceInput
                    id="student-name"
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(value) => setStudentName(value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email (Optional)</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your results via email
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">🌱 Beginner</SelectItem>
                      <SelectItem value="intermediate">🚀 Intermediate</SelectItem>
                      <SelectItem value="advanced">🔥 Advanced</SelectItem>
                      <SelectItem value="expert">💎 Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questions">Number of Questions</Label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="25">25 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  onClick={generateTest}
                  disabled={!customSubject.trim() || !difficulty || isGenerating}
                  className="btn-hero text-lg px-8 py-3"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      Generate Quiz
                      <Zap className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'taking') {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <div className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full">
                {customSubject} • {difficulty}
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="card-elevated mb-8">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion?.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion?.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[currentQuestion.id] === index
                      ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[currentQuestion.id] === index
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground'
                    }`}>
                      {answers[currentQuestion.id] === index && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              size="lg"
            >
              Previous
            </Button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <Button 
                onClick={submitTest}
                disabled={Object.keys(answers).length !== questions.length}
                className="btn-success"
                size="lg"
              >
                Submit Quiz
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={!answers.hasOwnProperty(currentQuestion?.id)}
                className="btn-hero"
                size="lg"
              >
                Next
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && testResult) {
    const getGradeColor = (percentage: number) => {
      if (percentage >= 90) return 'text-emerald-400';
      if (percentage >= 80) return 'text-green-400';
      if (percentage >= 70) return 'text-yellow-400';
      if (percentage >= 60) return 'text-orange-400';
      return 'text-red-400';
    };

    const getGradeEmoji = (percentage: number) => {
      if (percentage >= 90) return '🏆';
      if (percentage >= 80) return '🎉';
      if (percentage >= 70) return '👏';
      if (percentage >= 60) return '👍';
      return '💪';
    };

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className={`p-6 rounded-full ${
                testResult.percentage >= 70 ? 'bg-gradient-success' : 'bg-gradient-to-r from-orange-500 to-red-500'
              } shadow-glow`}>
                <span className="text-4xl">
                  {getGradeEmoji(testResult.percentage)}
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-xl text-muted-foreground">
              Here are your results for <span className="text-primary font-semibold">{testResult.subject}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-elevated text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {testResult.score}
                </div>
                <div className="text-muted-foreground">Correct Answers</div>
              </CardContent>
            </Card>
            <Card className="card-elevated text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {testResult.totalQuestions}
                </div>
                <div className="text-muted-foreground">Total Questions</div>
              </CardContent>
            </Card>
            <Card className="card-elevated text-center">
              <CardContent className="p-6">
                <div className={`text-4xl font-bold mb-2 ${getGradeColor(testResult.percentage)}`}>
                  {testResult.percentage}%
                </div>
                <div className="text-muted-foreground">Final Score</div>
              </CardContent>
            </Card>
          </div>

          {isSendingEmail && (
            <Card className="card-elevated mb-6">
              <CardContent className="flex items-center gap-3 p-4">
                <Mail className="h-5 w-5 animate-bounce-subtle text-primary" />
                <span>Sending results to your email...</span>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => {
                setStep('setup');
                setQuestions([]);
                setAnswers({});
                setTestResult(null);
                setCurrentQuestionIndex(0);
                setCustomSubject('');
              }}
              className="btn-hero"
              size="lg"
            >
              Create New Quiz
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};