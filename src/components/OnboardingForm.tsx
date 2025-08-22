import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { BookOpen, User, Target, Clock, Zap } from "lucide-react";

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
            <Textarea
              id="goals"
              value={data.goals}
              onChange={(e) => updateData("goals", e.target.value)}
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