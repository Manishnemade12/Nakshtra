// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X, Send, Bot } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;
// }

// export const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: "Hello! I'm your AI study assistant. How can I help you with your genetics studies today?",
//       sender: 'bot',
//       timestamp: new Date()
//     }
//   ]);
//   const [inputValue, setInputValue] = useState('');

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputValue,
//       sender: 'user',
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');

//     // Simulate bot response
//     setTimeout(() => {
//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: getBotResponse(inputValue),
//         sender: 'bot',
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, botMessage]);
//     }, 1000);
//   };

//   const getBotResponse = (userInput: string) => {
//     const responses = [
//       "That's a great question! Let me help you understand that concept better.",
//       "I can see you're working on genetics. Would you like me to create a personalized study plan?",
//       "Based on your progress, I recommend focusing on DNA replication next.",
//       "Let me break that down into simpler concepts for you.",
//       "Great progress! Your understanding of genetics is improving significantly."
//     ];
//     return responses[Math.floor(Math.random() * responses.length)];
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       <motion.div
//         className="fixed bottom-6 right-6 z-50"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <Button
//           onClick={() => setIsOpen(true)}
//           className={`w-16 h-16 rounded-full glass-strong shadow-2xl bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal border-2 border-accent-teal/30 neural-glow smooth-transition ${
//             isOpen ? 'hidden' : 'flex'
//           }`}
//         >
//           <motion.div
//             animate={{ rotate: [0, 360] }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           >
//             <MessageCircle className="w-7 h-7 text-white" />
//           </motion.div>
//         </Button>
//       </motion.div>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
//             animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="fixed bottom-6 right-6 z-50 w-96 h-[500px]"
//           >
//             <Card className="glass-strong border border-accent-teal/30 shadow-2xl h-full flex flex-col neural-glow">
//               {/* Header */}
//               <div className="flex items-center justify-between p-4 border-b border-border/50">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-teal flex items-center justify-center">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold font-poppins">AI Study Assistant</h3>
//                     <p className="text-xs text-muted-foreground">Online • Genetics Expert</p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setIsOpen(false)}
//                   className="hover:bg-destructive/20"
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>

//               {/* Messages */}
//               <ScrollArea className="flex-1 p-4">
//                 <div className="space-y-4">
//                   {messages.map((message) => (
//                     <motion.div
//                       key={message.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`max-w-[80%] p-3 rounded-2xl ${
//                           message.sender === 'user'
//                             ? 'bg-gradient-to-r from-primary to-secondary-purple text-white'
//                             : 'glass border border-border/30'
//                         }`}
//                       >
//                         <p className="text-sm">{message.text}</p>
//                         <p className={`text-xs mt-1 ${
//                           message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
//                         }`}>
//                           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </ScrollArea>

//               {/* Input */}
//               <div className="p-4 border-t border-border/50">
//                 <div className="flex space-x-2">
//                   <Input
//                     placeholder="Ask me about genetics..."
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     className="glass border-accent-teal/30 focus:border-accent-teal"
//                   />
//                   <Button
//                     onClick={handleSendMessage}
//                     size="icon"
//                     className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal"
//                   >
//                     <Send className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };


import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { v4 as uuidv4 } from "uuid";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini API setup (move key to .env in production)
const genAI = new GoogleGenerativeAI("AIzaSyAlH6fGlkav2uGJckN3diEO1HGAhzztYME");

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hello! I'm your AI study assistant. How can I help you with your genetics studies today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Voice input (Speech-to-Text)
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + (prev ? " " : "") + transcript);
        setIsListening(false);
      };
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    setIsListening(true);
    recognitionRef.current.start();
  };

  // Text-to-Speech (Audio response)
  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  // Gemini API call
  const getGeminiResponse = async (userInput: string) => {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userInput);
      const response = await result.response;
      const text = response.text();
      setIsLoading(false);
      return text;
    } catch (e) {
      setIsLoading(false);
      return "Sorry, I couldn't process your request. Please try again.";
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: uuidv4(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Gemini API response
    const botText = await getGeminiResponse(userMessage.text);
    const botMessage: Message = {
      id: uuidv4(),
      text: botText,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
    speak(botText);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className={`w-16 h-16 rounded-full glass-strong shadow-2xl bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal border-2 border-accent-teal/30 neural-glow smooth-transition ${
            isOpen ? "hidden" : "flex"
          }`}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px]"
          >
            <Card className="glass-strong border border-accent-teal/30 shadow-2xl h-full flex flex-col neural-glow">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-teal flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-poppins">AI Study Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online • Genetics Expert</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-destructive/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-primary to-secondary-purple text-white"
                            : "glass border border-border/30"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-2xl glass border border-border/30 flex items-center gap-2">
                        <Loader2 className="animate-spin w-4 h-4" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me about genetics..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="glass border-accent-teal/30 focus:border-accent-teal"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal"
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={isListening ? undefined : handleVoiceInput}
                    size="icon"
                    variant={isListening ? "secondary" : "outline"}
                    className={`border-accent-teal/30 ${isListening ? "animate-pulse" : ""}`}
                    disabled={isListening || isLoading}
                    aria-label="Voice input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};