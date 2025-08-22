// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
// import { BookOpen, User, Target, Clock, Zap } from "lucide-react";
// import { Mic, MicOff } from "lucide-react";

// interface OnboardingData {
//   name: string;
//   age: number;
//   subject: string;
//   goals: string;
//   confidenceLevel: number;
//   hoursPerWeek: number;
//   preferredTime: string;
// }

// interface OnboardingFormProps {
//   onComplete: (data: OnboardingData) => void;
// }


// interface ISpeechRecognition extends EventTarget {
//   continuous: boolean;
//   interimResults: boolean;
//   lang: string;
//   start: () => void;
//   stop: () => void;
//   onstart: (() => void) | null;
//   onend: (() => void) | null;
//   onresult: ((event: SpeechRecognitionEvent) => void) | null;
// }

// interface SpeechRecognitionEvent extends Event {
//   results: SpeechRecognitionResultList;
// }

// type Props = {
//   data: { goals: string };
//   updateData: (field: string, value: string) => void;
// };

// export function OnboardingForm({ onComplete }: OnboardingFormProps) {
//   const [step, setStep] = useState(1);
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

//   const handleSubmit = () => {
//     onComplete(data);
//   };

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
//             <Label htmlFor="goals">Describe your learning in brief</Label>
//             <Textarea
//               id="goals"
//               value={data.goals}
//               onChange={(e) => updateData("goals", e.target.value)}
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
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
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
//               disabled={step === 1}
//             >
//               Previous
//             </Button>
            
//             {step === 5 ? (
//               <Button
//                 onClick={handleSubmit}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={!data.name || !data.subject || !data.goals || !data.preferredTime}
//               >
//                 Create My Study Plan
//               </Button>
//             ) : (
//               <Button
//                 onClick={nextStep}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={(step === 1 && (!data.name || !data.age)) || 
//                          (step === 2 && !data.subject) || 
//                          (step === 3 && !data.goals)}
//               >
//                 Next
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { BookOpen, User, Target, Clock, Zap } from "lucide-react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface OnboardingFormProps {
  onComplete: (data: OnboardingData) => void;
}

// Speech Recognition Hook
const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
            isListening && "text-red-500 animate-pulse"
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

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
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

  const handleSubmit = () => {
    onComplete(data);
  };

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
            <Label htmlFor="goals">Describe your learning in brief</Label>
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
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
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
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step === 5 ? (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-primary hover:opacity-90"
                disabled={!data.name || !data.subject || !data.goals || !data.preferredTime}
              >
                Create My Study Plan
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-primary hover:opacity-90"
                disabled={(step === 1 && (!data.name || !data.age)) || 
                         (step === 2 && !data.subject) || 
                         (step === 3 && !data.goals)}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Index = () => {
  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log("Onboarding completed with data:", data);
    // Handle the completion here
  };

  return <OnboardingForm onComplete={handleOnboardingComplete} />;
};

export default Index;

// import { useState, useCallback, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
// import { BookOpen, User, Target, Clock, Zap } from "lucide-react";
// import { Mic, MicOff } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ResourceRecommendations } from "@/components/ResourceRecommendations";
// // import { useResourceRecommendations } from "@/hooks/useResourceRecommendations";
// import { useResourceRecommendations } from "@/hooks/useResourceRecommendations";

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

// interface OnboardingFormProps {
//   onComplete: (data: OnboardingData) => void;
// }

// // Speech Recognition Hook
// const useSpeechRecognition = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

//   useEffect(() => {
//     if (!isSupported) return;

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
//             isListening && "text-red-500 animate-pulse"
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

// export function OnboardingForm({ onComplete }: OnboardingFormProps) {
//   const [step, setStep] = useState(1);
//   const [resources, setResources] = useState<any[]>([]);
//   const [isLoadingResources, setIsLoadingResources] = useState(false);
//   const { fetchResources } = useResourceRecommendations();
//   const [data, setData] = useState<OnboardingData>({
//     name: "",
//     age: 18,
//     subject: "",
//     goals: "",
//     confidenceLevel: 50,
//     hoursPerWeek: 5,
//     preferredTime: ""
//   });

//   // Fetch resources when step or subject changes
//   useEffect(() => {
//     const loadResources = async () => {
//       setIsLoadingResources(true);
//       try {
//         const userLevel = data.confidenceLevel < 30 ? 'beginner' : 
//                          data.confidenceLevel < 70 ? 'intermediate' : 'advanced';
//         const newResources = await fetchResources(data.subject || 'general studies', step, userLevel);
//         setResources(newResources);
//       } catch (error) {
//         console.error('Failed to load resources:', error);
//         setResources([]);
//       } finally {
//         setIsLoadingResources(false);
//       }
//     };

//     loadResources();
//   }, [step, data.subject, data.confidenceLevel, fetchResources]);

//   const updateData = (field: keyof OnboardingData, value: any) => {
//     setData(prev => ({ ...prev, [field]: value }));
//   };

//   const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

//   const handleSubmit = () => {
//     onComplete(data);
//   };

//   const getResourceTitle = (step: number) => {
//     const titles = {
//       1: "Getting Started Resources",
//       2: `${data.subject || 'Learning'} Resources & Guides`,
//       3: "Goal Setting & Learning Strategies",
//       4: "Building Confidence & Study Skills", 
//       5: "Time Management & Study Planning"
//     };
//     return titles[step as keyof typeof titles];
//   };

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
//         <ResourceRecommendations
//           resources={resources}
//           isLoading={isLoadingResources}
//           title={getResourceTitle(1)}
//         />
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
//         <ResourceRecommendations
//           resources={resources}
//           isLoading={isLoadingResources}
//           title={getResourceTitle(2)}
//         />
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
//             <Label htmlFor="goals">Describe your learning in brief</Label>
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
//         <ResourceRecommendations
//           resources={resources}
//           isLoading={isLoadingResources}
//           title={getResourceTitle(3)}
//         />
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
//         <ResourceRecommendations
//           resources={resources}
//           isLoading={isLoadingResources}
//           title={getResourceTitle(4)}
//         />
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
//         <ResourceRecommendations
//           resources={resources}
//           isLoading={isLoadingResources}
//           title={getResourceTitle(5)}
//         />
//       </div>
//     )
//   };

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
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
//               disabled={step === 1}
//             >
//               Previous
//             </Button>
            
//             {step === 5 ? (
//               <Button
//                 onClick={handleSubmit}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={!data.name || !data.subject || !data.goals || !data.preferredTime}
//               >
//                 Create My Study Plan
//               </Button>
//             ) : (
//               <Button
//                 onClick={nextStep}
//                 className="bg-gradient-primary hover:opacity-90"
//                 disabled={(step === 1 && (!data.name || !data.age)) || 
//                          (step === 2 && !data.subject) || 
//                          (step === 3 && !data.goals)}
//               >
//                 Next
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// const Index = () => {
//   const handleOnboardingComplete = (data: OnboardingData) => {
//     console.log("Onboarding completed with data:", data);
//     // Handle the completion here
//   };

//   return <OnboardingForm onComplete={handleOnboardingComplete} />;
// };

// export default Index;