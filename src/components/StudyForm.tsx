import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";

interface StudyFormProps {
  onSubmit: (branch: string, field: string) => void;
  isLoading: boolean;
}

const StudyForm = ({ onSubmit, isLoading }: StudyFormProps) => {
  const [branch, setBranch] = useState("");
  const [field, setField] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (branch.trim() && field.trim()) {
      onSubmit(branch.trim(), field.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-academic-light to-academic-lighter border-academic-blue/20 shadow-elegant">
      <CardHeader className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-academic-blue to-academic-purple bg-clip-text text-transparent">
            StudyGine AI
          </CardTitle>
        </div>
        <CardDescription className="text-lg text-muted-foreground">
          Get the latest news, trends, and updates in your field of study
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="branch" className="text-sm font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-academic-blue" />
              <span>Branch of Study</span>
            </Label>
            <Input
              id="branch"
              type="text"
              placeholder="e.g., Computer Science, Medicine, Engineering..."
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-background/50 border-academic-blue/30 focus:border-academic-purple focus:ring-academic-purple/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field" className="text-sm font-medium flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-academic-purple" />
              <span>Field of Interest</span>
            </Label>
            <Textarea
              id="field"
              placeholder="e.g., Artificial Intelligence, Machine Learning, Blockchain, Quantum Computing..."
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="bg-background/50 border-academic-blue/30 focus:border-academic-purple focus:ring-academic-purple/30 min-h-[100px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !branch.trim() || !field.trim()}
            className="w-full bg-gradient-to-r from-academic-blue to-academic-purple hover:from-academic-blue/90 hover:to-academic-purple/90 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating Content...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Get Latest Updates</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudyForm;