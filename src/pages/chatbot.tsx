import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { Send, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Your Gemini API key here
const GEMINI_API_KEY = 'AIzaSyDv2OB83waQbnOFvb1-dvRI2gUuK3YaUuw';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chatbot = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isRecording) inputRef.current?.focus();
  }, [isTyping, messages, isRecording]);

  // Send text message
  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);
    try {
      const prompt =
        messages
          .concat({ role: 'user', content: text })
          .map((m) => (m.role === 'user' ? `User: ${m.content}` : `AI: ${m.content}`))
          .join('\n') + '\nAI:';
      const result = await model.generateContent(prompt);
      const aiResponse = result.response?.text() || 'Sorry, I could not respond.';
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse.trim() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error generating response. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Voice input with Web Speech API
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setInput(text);
      setIsRecording(false);
      inputRef.current?.focus();
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
  };

  // Text to Speech for AI message
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Form submit handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && !isTyping && !isRecording) {
      setInput('');
      sendMessage(trimmed);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget.form as HTMLFormElement).requestSubmit();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: 520,
        margin: '0 auto',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 24px #0002',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <header
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          padding: '1.1rem 1rem',
          color: 'white',
          fontWeight: 600,
          fontSize: '1.45rem',
          letterSpacing: 1,
          userSelect: 'none',
        }}
      >
        Gemini Chatbot
      </header>

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          background: '#ecf6ff',
        }}
      >
        {messages.length === 0 && (
          <p
            style={{
              textAlign: 'center',
              color: '#64748b',
              opacity: 0.88,
              fontSize: 18,
              margin: 0,
              userSelect: 'none',
            }}
          >
            Say hello! Type or use voice input.
          </p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: 12,
              marginBottom: 16,
            }}
          >
            {msg.role === 'assistant' && (
              <div
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #bae6fd',
                  borderRadius: '12px 12px 12px 3px',
                  padding: '14px 18px',
                  maxWidth: '70%',
                  position: 'relative',
                  color: '#1e293b',
                  boxShadow: '0 3px 10px rgb(59 130 246 / 0.15)',
                  fontSize: 16,
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                <button
                  onClick={() =>
                    isSpeaking ? stopSpeaking() : speakText(msg.content)
                  }
                  aria-label={isSpeaking ? 'Stop reading' : 'Read message aloud'}
                  style={{
                    position: 'absolute',
                    bottom: 7,
                    right: 8,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#38bdf8',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    userSelect: 'none',
                  }}
                  type="button"
                >
                  {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span style={{ fontSize: 13 }}>{isSpeaking ? 'Stop' : 'Read'}</span>
                </button>
              </div>
            )}
            {msg.role === 'user' && (
              <div
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '12px 12px 3px 12px',
                  padding: '14px 18px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  fontSize: 16,
                  boxShadow: '0 3px 8px rgb(59 130 246 / 0.25)',
                  position: 'relative',
                }}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <p style={{ color: '#64748b', fontStyle: 'italic', margin: 0 }}>
            AI is typing...
          </p>
        )}
        <div ref={messagesEndRef} />
      </main>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#fff',
        }}
      >
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={isTyping || isRecording}
          aria-label="Mic voice input"
          style={{
            background: isRecording ? '#bae6fd' : 'transparent',
            border: 'none',
            color: isRecording ? '#06b6d4' : '#64748b',
            cursor: isRecording ? 'not-allowed' : 'pointer',
            marginLeft: -2,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {isRecording ? <MicOff size={23} /> : <Mic size={23} />}
        </button>

        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping || isRecording}
          placeholder={isRecording ? 'Listening...' : 'Type message...'}
          aria-label="Message input"
          spellCheck={false}
          autoComplete="off"
          style={{
            flex: 1,
            borderRadius: 20,
            border: '1px solid #bae6fd',
            padding: '0.6rem 1rem',
            fontSize: 16,
            outline: 'none',
            marginRight: 8,
            color: '#1e293b',
            background: '#fafdff',
            transition: 'all 0.2s',
          }}
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim() || isRecording}
          aria-label="Send message"
          style={{
            backgroundColor:
              isTyping || !input.trim() || isRecording ? '#bae6fd' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 20,
            padding: '0 1.15rem',
            cursor:
              isTyping || !input.trim() || isRecording ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
