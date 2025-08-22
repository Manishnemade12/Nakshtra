import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Dna
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'quiz';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI genetics tutor. I can help you understand complex genetic concepts, solve problems, and answer any questions about genetics. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 60000),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: "Explain DNA replication", icon: Dna },
    { text: "What is meiosis?", icon: BookOpen },
    { text: "Help with Punnett squares", icon: HelpCircle },
    { text: "Give me a genetics quiz", icon: Lightbulb },
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string) => {
    const responses = {
      'dna': "DNA replication is a fascinating process! It's the biological process by which a cell makes an identical copy of its DNA. This occurs during the S phase of the cell cycle. The process involves unwinding the double helix, synthesizing new complementary strands, and ensuring accuracy through proofreading mechanisms. Would you like me to break down the specific steps?",
      'meiosis': "Meiosis is the process by which gametes (sex cells) are produced. Unlike mitosis, meiosis results in four genetically unique haploid cells from one diploid cell. This process is crucial for sexual reproduction and genetic diversity. The key stages include prophase I (with crossing over), metaphase I, anaphase I, telophase I, then a second division similar to mitosis. What aspect would you like to explore further?",
      'punnett': "Punnett squares are excellent tools for predicting genetic outcomes! They help visualize the possible combinations of alleles from parent organisms. For a monohybrid cross, you'd set up a 2x2 grid, placing one parent's alleles on top and the other's on the side. Then fill in the squares to see all possible offspring genotypes. Would you like me to walk through a specific example?",
      'quiz': "Great! Here's a genetics question for you: If a heterozygous tall plant (Tt) is crossed with a homozygous short plant (tt), what percentage of the offspring will be tall? Think about it and let me know your answer!"
    };

    const input = userInput.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (input.includes(key)) {
        return response;
      }
    }

    return "That's a great question! I'd be happy to help you understand that concept better. Could you provide a bit more context or let me know specifically what aspect you'd like me to explain?";
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold font-poppins mb-2 flex items-center"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary-purple to-accent-teal flex items-center justify-center mr-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            AI Genetics Tutor
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground"
          >
            Ask questions, get explanations, and practice genetics concepts with your AI assistant
          </motion.p>
        </div>

        {/* Quick Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick suggestions:</h3>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-primary hover:text-white smooth-transition flex items-center space-x-1 py-2 px-3"
                  onClick={() => handleSendMessage(suggestion.text)}
                >
                  <suggestion.icon className="w-3 h-3" />
                  <span>{suggestion.text}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chat Container */}
        <Card className="glass h-[600px] flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-primary to-secondary-purple' 
                        : 'bg-gradient-to-r from-secondary-purple to-accent-teal'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary to-secondary-purple text-white'
                        : 'glass border border-border/30'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-secondary-purple to-accent-teal flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="glass border border-border/30 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-accent-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t border-border/30">
            <div className="flex space-x-3">
              <Input
                placeholder="Ask me anything about genetics..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="glass border-accent-teal/30 focus:border-accent-teal"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}