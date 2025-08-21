import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextToSpeechProps {
  content: string;
  isVisible: boolean;
}

// ElevenLabs voice options
const VOICES = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George" },
  { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum" },
  { id: "SAz9YHcvj6GT2YYXdXww", name: "River" }
];

const TextToSpeech = ({ content, isVisible }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].id);
  const [volume, setVolume] = useState([0.7]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Clean content for TTS (remove markdown, emojis, URLs)
  const cleanContentForTTS = (text: string): string => {
    return text
      .replace(/[#*`]/g, '') // Remove markdown
      .replace(/🔬|📈|📚|🎥|📰|🏢|🌐/g, '') // Remove emojis
      .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
      .replace(/\n+/g, '. ') // Replace newlines with periods
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
  };

  const generateSpeech = async () => {
    if (!content.trim()) {
      toast({
        title: "No Content",
        description: "There's no content to convert to speech.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Note: In a real implementation, you'd need the user's ElevenLabs API key
      // For demo purposes, we'll use the Web Speech API as fallback
      const cleanText = cleanContentForTTS(content);
      
      if ('speechSynthesis' in window) {
        // Fallback to Web Speech API
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = isMuted ? 0 : volume[0];
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => {
          setIsPlaying(false);
          toast({
            title: "Speech Error",
            description: "Failed to generate speech. Please try again.",
            variant: "destructive"
          });
        };
        
        speechSynthesis.speak(utterance);
        
        toast({
          title: "Playing Audio",
          description: "Using browser's built-in speech synthesis."
        });
      } else {
        throw new Error('Speech synthesis not supported');
      }
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: "Speech Generation Failed",
        description: "Please ensure you have a valid ElevenLabs API key configured.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.pause();
      setIsPlaying(false);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume[0] : 0;
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-br from-academic-light/50 to-academic-lighter/50 border-academic-blue/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Volume2 className="h-5 w-5 text-academic-blue" />
          <span>Text-to-Speech</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Listen to the generated content with AI voice synthesis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Voice Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="bg-background/50 border-academic-blue/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VOICES.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Volume</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="p-1 h-6 w-6"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={1}
            min={0}
            step={0.1}
            className="w-full"
            disabled={isMuted}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={generateSpeech}
            disabled={isLoading || isPlaying}
            className="flex-1 bg-gradient-to-r from-academic-blue to-academic-purple hover:from-academic-blue/90 hover:to-academic-purple/90"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Play</span>
              </div>
            )}
          </Button>
          
          <Button
            onClick={pauseSpeech}
            disabled={!isPlaying}
            variant="outline"
            className="border-academic-blue/30 text-academic-blue hover:bg-academic-blue/10"
          >
            <Pause className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={stopSpeech}
            disabled={!isPlaying}
            variant="outline"
            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} style={{ display: 'none' }} />
      </CardContent>
    </Card>
  );
};

export default TextToSpeech;