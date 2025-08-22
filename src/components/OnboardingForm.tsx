// import { useState, useCallback, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { BookOpen, User, Target, Clock, Zap, Brain, ExternalLink, Play, FileText, Mic, MicOff } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useToast } from '@/hooks/use-toast';

// // Speech Recognition Types
// interface SpeechRecognitionResult {
//   readonly [index: number]: SpeechRecognitionAlternative;
//   readonly length: number;
//   isFinal: boolean;
// }

// interface SpeechRecognitionAlternative {
//   readonly transcript: string;
//   readonly confidence: number;
// }

// interface SpeechRecognitionEvent extends Event {
//   readonly resultIndex: number;
//   readonly results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionResultList {
//   readonly [index: number]: SpeechRecognitionResult;
//   readonly length: number;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   readonly error: string;
//   readonly message: string;
// }

// interface SpeechRecognition extends EventTarget {
//   continuous: boolean;
//   interimResults: boolean;
//   lang: string;
//   maxAlternatives: number;
//   serviceURI: string;
//   start(): void;
//   stop(): void;
//   abort(): void;
//   onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
//   onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
//   onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
//   onend: ((this: SpeechRecognition, ev: Event) => any) | null;
// }

// declare global {
//   interface Window {
//     webkitSpeechRecognition: {
//       new (): SpeechRecognition;
//     };
//     SpeechRecognition: {
//       new (): SpeechRecognition;
//     };
//   }
// }

// interface OnboardingData {
//   name: string;
//   age: number;
//   subject: string;
//   goals: string;
//   confidenceLevel: number;
//   hoursPerWeek: number;
//   preferredTime: string;
// }

// interface StudyResource {
//   title: string;
//   url: string;
//   type: 'article' | 'video' | 'resource';
//   description: string;
// }

// interface PersonalizedPlan {
//   welcomeMessage: string;
//   resources: StudyResource[];
//   studyTips: string[];
//   weeklyPlan: string[];
// }

// interface OnboardingFormProps {
//   onComplete: (data: OnboardingData) => void;
// }

// // Gemini API integration
// const GEMINI_API_KEY = 'AIzaSyDR6kzuVXzuqC4h0NOupigXPoprJjPo7KE';
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// async function generatePersonalizedPlan(data: OnboardingData): Promise<PersonalizedPlan> {
//   const prompt = `
// You are a personalized study assistant. Based on the following user information, create a comprehensive study plan.

// User Profile:
// - Name: ${data.name}
// - Age: ${data.age}
// - Subject: ${data.subject}
// - Goals: ${data.goals}
// - Confidence Level: ${data.confidenceLevel}%
// - Hours per week: ${data.hoursPerWeek}
// - Preferred study time: ${data.preferredTime}

// Please respond with a JSON object containing:
// {
//   "welcomeMessage": "A personalized welcome message for ${data.name}",
//   "resources": [
//     {
//       "title": "Resource title",
//       "url": "https://example.com",
//       "type": "article" | "video" | "resource",
//       "description": "Brief description"
//     }
//   ],
//   "studyTips": [
//     "Personalized study tip based on their profile",
//     "Another tip specific to their subject and goals"
//   ],
//   "weeklyPlan": [
//     "Monday: Specific study activity",
//     "Tuesday: Another activity",
//     "etc..."
//   ]
// }

// Requirements:
// 1. Include 8-12 diverse resources (mix of articles, YouTube videos, and study resources)
// 2. Make resources highly relevant to their subject and goals
// 3. Provide real, actionable URLs when possible (use actual educational websites)
// 4. Create 5-7 personalized study tips based on their confidence level and time availability
// 5. Generate a weekly study plan that fits their available hours and preferred time
// 6. Make the tone encouraging and supportive

// Focus on ${data.subject} and specifically address their goals: "${data.goals}"

// Please respond ONLY with the JSON object, no additional text.`;

//   try {
//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt
//               }
//             ]
//           }
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           topK: 40,
//           topP: 0.8,
//           maxOutputTokens: 2048,
//         }
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Gemini API error: ${response.status}`);
//     }

//     const apiData = await response.json();
//     const generatedText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!generatedText) {
//       throw new Error('No response from Gemini API');
//     }

//     // Extract JSON from response
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('Invalid JSON response from Gemini');
//     }

//     const parsedResponse = JSON.parse(jsonMatch[0]);
//     return parsedResponse;
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     throw new Error('Failed to generate personalized plan. Please try again.');
//   }
// }

// // Speech Recognition Hook
// const useSpeechRecognition = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   const isSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

//   useEffect(() => {
//     if (!isSupported) return;

//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();

//     const recognition = recognitionRef.current;
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = 'en-US';

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       let finalTranscript = '';
//       let interimTranscript = '';

//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         const result = event.results[i];
//         if (result.isFinal) {
//           finalTranscript += result[0].transcript;
//         } else {
//           interimTranscript += result[0].transcript;
//         }
//       }

//       setTranscript(finalTranscript + interimTranscript);
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error('Speech recognition error:', event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, [isSupported]);

//   const startListening = useCallback(() => {
//     if (!isSupported || !recognitionRef.current) return;
//     setTranscript('');
//     setIsListening(true);
//     recognitionRef.current.start();
//   }, [isSupported]);

//   const stopListening = useCallback(() => {
//     if (!recognitionRef.current) return;
//     setIsListening(false);
//     recognitionRef.current.stop();
//   }, []);

//   const resetTranscript = useCallback(() => {
//     setTranscript('');
//   }, []);

//   return {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//     resetTranscript,
//     isSupported,
//   };
// };

// // Voice Input Textarea Component
// interface VoiceInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
//   onVoiceInput?: (text: string) => void;
// }

// const VoiceInputTextarea: React.FC<VoiceInputTextareaProps> = ({ 
//   className, 
//   onVoiceInput, 
//   value, 
//   onChange, 
//   ...props 
// }) => {
//   const {
//     isListening,
//     transcript,
//     startListening,
//     stopListening,
//     resetTranscript,
//     isSupported,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript && onVoiceInput) {
//       onVoiceInput(transcript);
//     }
//   }, [transcript, onVoiceInput]);

//   const handleVoiceToggle = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       resetTranscript();
//       startListening();
//     }
//   };

//   return (
//     <div className="relative">
//       <Textarea
//         className={cn("pr-12", className)}
//         value={value}
//         onChange={onChange}
//         {...props}
//       />
//       {isSupported && (
//         <Button
//           type="button"
//           variant="ghost"
//           size="icon"
//           className={cn(
//             "absolute right-2 top-2 h-8 w-8",
//             isListening && "text-destructive animate-pulse"
//           )}
//           onClick={handleVoiceToggle}
//           title={isListening ? "Stop recording" : "Start voice input"}
//         >
//           {isListening ? (
//             <MicOff className="h-4 w-4" />
//           ) : (
//             <Mic className="h-4 w-4" />
//           )}
//         </Button>
//       )}
//       {isListening && (
//         <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
//           Listening... Speak now
//         </div>
//       )}
//     </div>
//   );
// };

// // Study Plan Display Component with per-step references toggle
// const StudyPlanDisplay: React.FC<{ plan: PersonalizedPlan }> = ({ plan }) => {
//   const getResourceIcon = (type: string) => {
//     switch (type) {
//       case 'video':
//         return <Play className="h-4 w-4" />;
//       case 'article':
//         return <FileText className="h-4 w-4" />;
//       default:
//         return <ExternalLink className="h-4 w-4" />;
//     }
//   };

//   const ResourceList = ({ items }: { items: StudyResource[] }) => (
//     <div className="grid gap-3">
//       {items.map((resource, idx) => (
//         <div key={idx} className="p-4 border rounded-lg hover:shadow-medium transition-all">
//           <div className="flex items-start gap-3">
//             <div className="p-2 bg-primary/10 rounded-md">
//               {getResourceIcon(resource.type)}
//             </div>
//             <div className="flex-1">
//               <h4 className="font-semibold">{resource.title}</h4>
//               <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
//               <a 
//                 href={resource.url} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-primary hover:underline text-sm flex items-center gap-1"
//               >
//                 View Reference <ExternalLink className="h-3 w-3" />
//               </a>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const byType = (type?: 'video' | 'article' | 'resource') => {
//     if (!plan.resources) return [] as StudyResource[];
//     return type ? plan.resources.filter((r) => r.type === type) : plan.resources;
//   };

//   return (
//     <div className="space-y-8">
//       {/* Welcome Message */}
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Brain className="h-5 w-5 text-primary" />
//             Welcome to Your Personalized Study Journey!
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground">{plan.welcomeMessage}</p>
//         </CardContent>
//       </Card>

//       {/* Resources (general) */}
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle>📚 Recommended Resources</CardTitle>
//           <CardDescription>Curated materials to help you achieve your goals</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="all" className="w-full">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="video">Videos</TabsTrigger>
//               <TabsTrigger value="article">Articles</TabsTrigger>
//               <TabsTrigger value="resource">Resources</TabsTrigger>
//             </TabsList>
//             <TabsContent value="all"><ResourceList items={byType()} /></TabsContent>
//             <TabsContent value="video"><ResourceList items={byType('video')} /></TabsContent>
//             <TabsContent value="article"><ResourceList items={byType('article')} /></TabsContent>
//             <TabsContent value="resource"><ResourceList items={byType('resource')} /></TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Study Tips */}
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle>💡 Personalized Study Tips</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {plan.studyTips.map((tip, index) => (
//               <div key={index} className="p-3 bg-accent/50 rounded-lg">
//                 <p className="text-sm">{tip}</p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Weekly Plan with references per step */}
//       <Card className="shadow-soft">
//         <CardHeader>
//           <CardTitle>📅 Your Weekly Study Plan</CardTitle>
//           <CardDescription>Expand each day to access tailored references</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Accordion type="single" collapsible className="w-full">
//             {plan.weeklyPlan.map((day, index) => (
//               <AccordionItem key={index} value={`day-${index}`}>
//                 <AccordionTrigger className="text-left">
//                   <div className="w-full flex items-center justify-between">
//                     <span className="font-medium">{day}</span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <Tabs defaultValue="video" className="w-full">
//                     <TabsList className="grid w-full grid-cols-4">
//                       <TabsTrigger value="video">Videos</TabsTrigger>
//                       <TabsTrigger value="article">Articles</TabsTrigger>
//                       <TabsTrigger value="resource">Resources</TabsTrigger>
//                       <TabsTrigger value="all">All</TabsTrigger>
//                     </TabsList>
//                     <div className="pt-4">
//                       <TabsContent value="video">
//                         {byType('video').length ? (
//                           <ResourceList items={byType('video')} />
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No videos found.</p>
//                         )}
//                       </TabsContent>
//                       <TabsContent value="article">
//                         {byType('article').length ? (
//                           <ResourceList items={byType('article')} />
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No articles found.</p>
//                         )}
//                       </TabsContent>
//                       <TabsContent value="resource">
//                         {byType('resource').length ? (
//                           <ResourceList items={byType('resource')} />
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No resources found.</p>
//                         )}
//                       </TabsContent>
//                       <TabsContent value="all">
//                         {byType().length ? (
//                           <ResourceList items={byType()} />
//                         ) : (
//                           <p className="text-sm text-muted-foreground">No references found.</p>
//                         )}
//                       </TabsContent>
//                     </div>
//                   </Tabs>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export function OnboardingForm({ onComplete }: OnboardingFormProps) {
//   const [step, setStep] = useState(1);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [studyPlan, setStudyPlan] = useState<PersonalizedPlan | null>(null);
//   const { toast } = useToast();
//   const [data, setData] = useState<OnboardingData>({
//     name: "",
//     age: 18,
//     subject: "",
//     goals: "",
//     confidenceLevel: 50,
//     hoursPerWeek: 5,
//     preferredTime: ""
//   });

//   const updateData = (field: keyof OnboardingData, value: any) => {
//     setData(prev => ({ ...prev, [field]: value }));
//   };

//   const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

//   const handleSubmit = async () => {
//     setIsGenerating(true);
//     try {
//       const plan = await generatePersonalizedPlan(data);
//       setStudyPlan(plan);
//       onComplete(data);
//       toast({
//         title: "🎉 Your study plan is ready!",
//         description: "We've created a personalized learning journey just for you.",
//       });
//     } catch (error) {
//       toast({
//         title: "Oops! Something went wrong",
//         description: error instanceof Error ? error.message : "Failed to generate your study plan.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   if (studyPlan) {
//     return (
//       <main className="min-h-screen bg-gradient-subtle p-4">
//         <div className="container mx-auto max-w-4xl">
//           <header className="mb-6 text-center">
//             <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               Your Personalized Study Plan
//             </h1>
//             <p className="text-muted-foreground mt-2">
//               Here's everything we've prepared to help you succeed!
//             </p>
//           </header>
//           <StudyPlanDisplay plan={studyPlan} />
//           <div className="mt-8 text-center">
//             <Button onClick={() => {
//               setStudyPlan(null);
//               setStep(1);
//               setData({
//                 name: "",
//                 age: 18,
//                 subject: "",
//                 goals: "",
//                 confidenceLevel: 50,
//                 hoursPerWeek: 5,
//                 preferredTime: ""
//               });
//             }}>
//               Create New Plan
//             </Button>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   const stepContent = {
//     1: (
//       <div className="space-y-6">
//         <div className="text-center space-y-2">
//           <User className="w-12 h-12 mx-auto text-primary" />
//           <h2 className="text-2xl font-bold">Let's get to know you!</h2>
//           <p className="text-muted-foreground">Tell us about yourself to create your perfect study plan</p>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">What's your name?</Label>
//             <Input
//               id="name"
//               value={data.name}
//               onChange={(e) => updateData("name", e.target.value)}
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="age">How old are you?</Label>
//             <Input
//               id="age"
//               type="number"
//               value={data.age}
//               onChange={(e) => updateData("age", parseInt(e.target.value))}
//               min="13"
//               max="100"
//             />
//           </div>
//         </div>
//       </div>
//     ),
//     2: (
//       <div className="space-y-6">
//         <div className="text-center space-y-2">
//           <BookOpen className="w-12 h-12 mx-auto text-primary" />
//           <h2 className="text-2xl font-bold">What do you want to learn?</h2>
//           <p className="text-muted-foreground">Choose your subject focus</p>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label>Subject Focus</Label>
//             <Select value={data.subject} onValueChange={(value) => updateData("subject", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select your subject" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="mathematics">Mathematics</SelectItem>
//                 <SelectItem value="science">Science</SelectItem>
//                 <SelectItem value="programming">Programming</SelectItem>
//                 <SelectItem value="languages">Languages</SelectItem>
//                 <SelectItem value="history">History</SelectItem>
//                 <SelectItem value="literature">Literature</SelectItem>
//                 <SelectItem value="art">Art & Design</SelectItem>
//                 <SelectItem value="music">Music</SelectItem>
//                 <SelectItem value="business">Business</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>
//     ),
//     3: (
//       <div className="space-y-6">
//         <div className="text-center space-y-2">
//           <Target className="w-12 h-12 mx-auto text-primary" />
//           <h2 className="text-2xl font-bold">What are your goals?</h2>
//           <p className="text-muted-foreground">Tell us what you want to achieve</p>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="goals">Describe your learning goals in brief</Label>
//             <VoiceInputTextarea
//               id="goals"
//               value={data.goals}
//               onChange={(e) => updateData("goals", e.target.value)}
//               onVoiceInput={(text) => updateData("goals", text)}
//               placeholder="e.g., Pass my calculus exam, learn Python programming, prepare for SATs..."
//               rows={4}
//             />
//           </div>
//         </div>
//       </div>
//     ),
//     4: (
//       <div className="space-y-6">
//         <div className="text-center space-y-2">
//           <Zap className="w-12 h-12 mx-auto text-primary" />
//           <h2 className="text-2xl font-bold">How confident are you?</h2>
//           <p className="text-muted-foreground">Rate your current knowledge level</p>
//         </div>
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <Label>Confidence Level: {data.confidenceLevel}%</Label>
//             <Slider
//               value={[data.confidenceLevel]}
//               onValueChange={(value) => updateData("confidenceLevel", value[0])}
//               max={100}
//               step={10}
//               className="w-full"
//             />
//             <div className="flex justify-between text-sm text-muted-foreground">
//               <span>Beginner</span>
//               <span>Intermediate</span>
//               <span>Advanced</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     ),
//     5: (
//       <div className="space-y-6">
//         <div className="text-center space-y-2">
//           <Clock className="w-12 h-12 mx-auto text-primary" />
//           <h2 className="text-2xl font-bold">When can you study?</h2>
//           <p className="text-muted-foreground">Let's plan your schedule</p>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-4">
//             <Label>Hours per week: {data.hoursPerWeek}</Label>
//             <Slider
//               value={[data.hoursPerWeek]}
//               onValueChange={(value) => updateData("hoursPerWeek", value[0])}
//               max={40}
//               min={1}
//               step={1}
//               className="w-full"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label>Preferred study time</Label>
//             <Select value={data.preferredTime} onValueChange={(value) => updateData("preferredTime", value)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="When do you study best?" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
//                 <SelectItem value="late-morning">Late Morning (9-12 PM)</SelectItem>
//                 <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
//                 <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
//                 <SelectItem value="night">Night (8-11 PM)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>
//     )
//   } as const;

//   return (
//     <main className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
//       <h1 className="sr-only">AI Study Buddy – Personalized Study Plan</h1>
//       <Card className="w-full max-w-2xl shadow-large">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//             Study Buddy Setup
//           </CardTitle>
//           <CardDescription>
//             Step {step} of 5 - Let's create your personalized learning journey
//           </CardDescription>
//           <div className="w-full bg-muted rounded-full h-2 mt-4">
//             <div 
//               className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
//               style={{ width: `${(step / 5) * 100}%` }}
//             />
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {stepContent[step as keyof typeof stepContent]}
//           <div className="flex justify-between pt-4">
//             <Button
//               variant="outline"
//               onClick={prevStep}
//               disabled={step === 1 || isGenerating}
//             >
//               Previous
//             </Button>
//             {step === 5 ? (
//               <Button
//                 onClick={handleSubmit}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={!data.name || !data.subject || !data.goals || !data.preferredTime || isGenerating}
//               >
//                 {isGenerating ? (
//                   <>
//                     <Brain className="h-4 w-4 mr-2 animate-pulse" />
//                     Generating Plan...
//                   </>
//                 ) : (
//                   'Create My Study Plan'
//                 )}
//               </Button>
//             ) : (
//               <Button
//                 onClick={nextStep}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={(step === 1 && (!data.name || !data.age)) || 
//                          (step === 2 && !data.subject) || 
//                          (step === 3 && !data.goals) ||
//                          isGenerating}
//               >
//                 Next
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

// const Index = () => {
//   // Basic SEO
//   useEffect(() => {
//     const title = 'AI Study Buddy – Personalized Study Plan';
//     const description = 'Create your personalized study plan with curated videos, articles, and references for every step.';
//     document.title = title;

//     const setMeta = (name: string, content: string) => {
//       let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
//       if (!el) {
//         el = document.createElement('meta');
//         el.setAttribute('name', name);
//         document.head.appendChild(el);
//       }
//       el.setAttribute('content', content);
//     };
//     setMeta('description', description);

//     // Canonical
//     let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
//     if (!link) {
//       link = document.createElement('link');
//       link.setAttribute('rel', 'canonical');
//       document.head.appendChild(link);
//     }
//     link.setAttribute('href', window.location.href);
//   }, []);

//   const handleOnboardingComplete = (data: OnboardingData) => {
//     console.log("Onboarding completed with data:", data);
//   };

//   return <OnboardingForm onComplete={handleOnboardingComplete} />;
// };

// export default Index;
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, User, Target, Clock, Zap, Brain, ExternalLink, Play, FileText, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';

// Speech Recognition Types
interface SpeechRecognitionResult {
  readonly [index: number]: SpeechRecognitionAlternative;
  readonly length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly [index: number]: SpeechRecognitionResult;
  readonly length: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  start(): void;
  stop(): void;
  abort(): void;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface OnboardingData {
  name: string;
  age: number;
  subject: string;
  goals: string;
  confidenceLevel: number;
  hoursPerWeek: number;
  preferredTime: string;
}

interface StudyResource {
  title: string;
  url: string;
  type: 'article' | 'video' | 'resource';
  description: string;
}

interface PersonalizedPlan {
  welcomeMessage: string;
  resources: StudyResource[];
  studyTips: string[];
  weeklyPlan: string[];
}

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

// Gemini API integration
const GEMINI_API_KEY = 'AIzaSyDR6kzuVXzuqC4h0NOupigXPoprJjPo7KE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function generatePersonalizedPlan(data: OnboardingData): Promise<PersonalizedPlan> {
  const prompt = `
You are a personalized study assistant. Based on the following user information, create a comprehensive study plan.

User Profile:
- Name: ${data.name}
- Age: ${data.age}
- Subject: ${data.subject}
- Goals: ${data.goals}
- Confidence Level: ${data.confidenceLevel}%
- Hours per week: ${data.hoursPerWeek}
- Preferred study time: ${data.preferredTime}

Please respond with a JSON object containing:
{
  "welcomeMessage": "A personalized welcome message for ${data.name}",
  "resources": [
    {
      "title": "Resource title",
      "url": "https://example.com",
      "type": "article" | "video" | "resource",
      "description": "Brief description"
    }
  ],
  "studyTips": [
    "Personalized study tip based on their profile",
    "Another tip specific to their subject and goals"
  ],
  "weeklyPlan": [
    "Monday: Specific study activity",
    "Tuesday: Another activity",
    "etc..."
  ]
}

Requirements:
1. Include 8-12 diverse resources (mix of articles, YouTube videos, and study resources)
2. Make resources highly relevant to their subject and goals
3. Provide real, actionable URLs when possible (use actual educational websites)
4. Create 5-7 personalized study tips based on their confidence level and time availability
5. Generate a weekly study plan that fits their available hours and preferred time
6. Make the tone encouraging and supportive

Focus on ${data.subject} and specifically address their goals: "${data.goals}"

Please respond ONLY with the JSON object, no additional text.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const apiData = await response.json();
    const generatedText = apiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    // Extract JSON from response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    return parsedResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate personalized plan. Please try again.');
  }
}

// Speech Recognition Hook
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) return;
    setTranscript('');
    setIsListening(true);
    recognitionRef.current.start();
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    setIsListening(false);
    recognitionRef.current.stop();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  };
};

// Voice Input Textarea Component
interface VoiceInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onVoiceInput?: (text: string) => void;
}

const VoiceInputTextarea: React.FC<VoiceInputTextareaProps> = ({ 
  className, 
  onVoiceInput, 
  value, 
  onChange, 
  ...props 
}) => {
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && onVoiceInput) {
      onVoiceInput(transcript);
    }
  }, [transcript, onVoiceInput]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="relative">
      <Textarea
        className={cn("pr-12", className)}
        value={value}
        onChange={onChange}
        {...props}
      />
      {isSupported && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-2 h-8 w-8",
            isListening && "text-destructive animate-pulse"
          )}
          onClick={handleVoiceToggle}
          title={isListening ? "Stop recording" : "Start voice input"}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}
      {isListening && (
        <div className="absolute -bottom-6 left-0 text-xs text-muted-foreground">
          Listening... Speak now
        </div>
      )}
    </div>
  );
};

// Study Plan Display Component with per-step references toggle
const StudyPlanDisplay: React.FC<{ plan: PersonalizedPlan }> = ({ plan }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const ResourceList = ({ items }: { items: StudyResource[] }) => (
    <div className="grid gap-3">
      {items.map((resource, idx) => (
        <div key={idx} className="p-4 border rounded-lg hover:shadow-medium transition-all">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              {getResourceIcon(resource.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{resource.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center gap-1"
              >
                View Reference <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const byType = (type?: 'video' | 'article' | 'resource') => {
    if (!plan.resources) return [] as StudyResource[];
    return type ? plan.resources.filter((r) => r.type === type) : plan.resources;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Welcome to Your Personalized Study Journey!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{plan.welcomeMessage}</p>
        </CardContent>
      </Card>

      {/* Resources (general) */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>📚 Recommended Resources</CardTitle>
          <CardDescription>Curated materials to help you achieve your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="resource">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="all"><ResourceList items={byType()} /></TabsContent>
            <TabsContent value="video"><ResourceList items={byType('video')} /></TabsContent>
            <TabsContent value="article"><ResourceList items={byType('article')} /></TabsContent>
            <TabsContent value="resource"><ResourceList items={byType('resource')} /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>💡 Personalized Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {plan.studyTips.map((tip, index) => (
              <div key={index} className="p-3 bg-accent/50 rounded-lg">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Plan with references per step */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>📅 Your Weekly Study Plan</CardTitle>
          <CardDescription>Expand each day to access tailored references</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {plan.weeklyPlan.map((day, index) => (
              <AccordionItem key={index} value={`day-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="w-full flex items-center justify-between">
                    <span className="font-medium">{day}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue="video" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="video">Videos</TabsTrigger>
                      <TabsTrigger value="article">Articles</TabsTrigger>
                      <TabsTrigger value="resource">Resources</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                    <div className="pt-4">
                      <TabsContent value="video">
                        {byType('video').length ? (
                          <ResourceList items={byType('video')} />
                        ) : (
                          <p className="text-sm text-muted-foreground">No videos found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="article">
                        {byType('article').length ? (
                          <ResourceList items={byType('article')} />
                        ) : (
                          <p className="text-sm text-muted-foreground">No articles found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="resource">
                        {byType('resource').length ? (
                          <ResourceList items={byType('resource')} />
                        ) : (
                          <p className="text-sm text-muted-foreground">No resources found.</p>
                        )}
                      </TabsContent>
                      <TabsContent value="all">
                        {byType().length ? (
                          <ResourceList items={byType()} />
                        ) : (
                          <p className="text-sm text-muted-foreground">No references found.</p>
                        )}
                      </TabsContent>
                    </div>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyPlan, setStudyPlan] = useState<PersonalizedPlan | null>(null);
  const { toast } = useToast();
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: 18,
    subject: "",
    goals: "",
    confidenceLevel: 50,
    hoursPerWeek: 5,
    preferredTime: ""
  });

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const plan = await generatePersonalizedPlan(data);
      setStudyPlan(plan);
      onComplete(data);
      toast({
        title: "🎉 Your study plan is ready!",
        description: "We've created a personalized learning journey just for you.",
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: error instanceof Error ? error.message : "Failed to generate your study plan.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (studyPlan) {
    return (
      <main className="min-h-screen bg-gradient-subtle p-4">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Your Personalized Study Plan
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's everything we've prepared to help you succeed!
            </p>
          </header>
          <StudyPlanDisplay plan={studyPlan} />
          <div className="mt-8 text-center">
            <Button onClick={() => {
              setStudyPlan(null);
              setStep(1);
              setData({
                name: "",
                age: 18,
                subject: "",
                goals: "",
                confidenceLevel: 50,
                hoursPerWeek: 5,
                preferredTime: ""
              });
            }}>
              Create New Plan
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const stepContent = {
    1: (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <User className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Let's get to know you!</h2>
          <p className="text-muted-foreground">Tell us about yourself to create your perfect study plan</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => updateData("name", e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">How old are you?</Label>
            <Input
              id="age"
              type="number"
              value={data.age}
              onChange={(e) => updateData("age", parseInt(e.target.value))}
              min="13"
              max="100"
            />
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <BookOpen className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">What do you want to learn?</h2>
          <p className="text-muted-foreground">Choose your subject focus</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Subject Focus</Label>
            <Select value={data.subject} onValueChange={(value) => updateData("subject", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="languages">Languages</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
                <SelectItem value="art">Art & Design</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Target className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">What are your goals?</h2>
          <p className="text-muted-foreground">Tell us what you want to achieve</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Describe your learning goals in brief</Label>
            <VoiceInputTextarea
              id="goals"
              value={data.goals}
              onChange={(e) => updateData("goals", e.target.value)}
              onVoiceInput={(text) => updateData("goals", text)}
              placeholder="e.g., Pass my calculus exam, learn Python programming, prepare for SATs..."
              rows={4}
            />
          </div>
        </div>
      </div>
    ),
    4: (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Zap className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">How confident are you?</h2>
          <p className="text-muted-foreground">Rate your current knowledge level</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Confidence Level: {data.confidenceLevel}%</Label>
            <Slider
              value={[data.confidenceLevel]}
              onValueChange={(value) => updateData("confidenceLevel", value[0])}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>
    ),
    5: (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Clock className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">When can you study?</h2>
          <p className="text-muted-foreground">Let's plan your schedule</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <Label>Hours per week: {data.hoursPerWeek}</Label>
            <Slider
              value={[data.hoursPerWeek]}
              onValueChange={(value) => updateData("hoursPerWeek", value[0])}
              max={40}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Preferred study time</Label>
            <Select value={data.preferredTime} onValueChange={(value) => updateData("preferredTime", value)}>
              <SelectTrigger>
                <SelectValue placeholder="When do you study best?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                <SelectItem value="late-morning">Late Morning (9-12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                <SelectItem value="night">Night (8-11 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    )
  } as const;

  return (
    <main className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <h1 className="sr-only">AI Study Buddy – Personalized Study Plan</h1>
      <Card className="w-full max-w-2xl shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Study Buddy Setup
          </CardTitle>
          <CardDescription>
            Step {step} of 5 - Let's create your personalized learning journey
          </CardDescription>
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {stepContent[step as keyof typeof stepContent]}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1 || isGenerating}
            >
              Previous
            </Button>
            {step === 5 ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-primary hover:opacity-90"
                disabled={!data.name || !data.subject || !data.goals || !data.preferredTime || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Generating Plan...
                  </>
                ) : (
                  'Create My Study Plan'
                )}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-primary hover:opacity-90"
                disabled={(step === 1 && (!data.name || !data.age)) || 
                         (step === 2 && !data.subject) || 
                         (step === 3 && !data.goals) ||
                         isGenerating}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

const Index = () => {
  // Basic SEO
  useEffect(() => {
    const title = 'AI Study Buddy – Personalized Study Plan';
    const description = 'Create your personalized study plan with curated videos, articles, and references for every step.';
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.href);
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log("Onboarding completed with data:", data);
  };

  return <OnboardingForm onComplete={handleOnboardingComplete} />;
};

export default Index;
