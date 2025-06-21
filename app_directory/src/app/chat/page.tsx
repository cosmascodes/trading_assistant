"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, ArrowLeft, Sparkles } from "lucide-react";

export default function GeneralChatPage() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const startNewChat = (messageText?: string) => {
    // Generate new chat ID and session ID
    const chatId = `chat_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 6)}`;
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const message = messageText || input.trim();
    
    if (message) {
      // Store session data with initial message - this will trigger auto-send
      sessionStorage.setItem(`chat_${chatId}`, JSON.stringify({
        sessionId,
        initialMessage: message,
        autoSend: true, // Flag to trigger immediate send
      }));
      
      console.log('Starting new chat:', { chatId, sessionId, message });
      
      // Navigate to the new chat - this will auto-send the message
      router.push(`/chat/${chatId}`);
    } else {
      // Store session data without initial message
      sessionStorage.setItem(`chat_${chatId}`, JSON.stringify({
        sessionId,
      }));
      
      // Navigate to empty chat
      router.push(`/chat/${chatId}`);
    }
  };

  const handleSubmit = () => {
    if (input.trim()) {
      startNewChat(input);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickStart = (prompt: string) => {
    startNewChat(prompt);
  };

  const suggestionPrompts = [
    {
      title: "Market Analysis",
      prompt: "Analyze current market trends and provide insights on potential investment opportunities",
      icon: "📈"
    },
    {
      title: "Portfolio Review", 
      prompt: "Review my portfolio performance and suggest optimizations",
      icon: "💼"
    },
    {
      title: "Risk Assessment",
      prompt: "Conduct a risk analysis of my current investment strategy",
      icon: "⚖️"
    },
    {
      title: "Trend Prediction",
      prompt: "Predict upcoming market trends based on current data and indicators",
      icon: "🔮"
    },
    {
      title: "Trading Strategy",
      prompt: "Help me develop a trading strategy for the current market conditions",
      icon: "🎯"
    },
    {
      title: "Economic Outlook",
      prompt: "Provide an economic outlook and its potential impact on investments",
      icon: "🌍"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold">Trading Assistant</h1>
          <p className="text-sm text-gray-400">Start a new conversation</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Welcome to Trading Assistant</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Your AI-powered companion for market analysis, portfolio management, and trading insights. 
              Start a conversation or choose from the suggestions below.
            </p>
          </div>

          {/* Quick Start Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {suggestionPrompts.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => handleQuickStart(suggestion.prompt)}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition-all duration-200 border border-gray-700 hover:border-accent/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {suggestion.prompt}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder="Ask about market trends, analyze assets, or get trading insights..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[44px] max-h-32 text-white bg-transparent border-0 resize-none p-0 placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={1}
                />
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className="h-11 w-11 bg-accent hover:bg-accent/90 text-gray-900 rounded-xl flex-shrink-0 disabled:opacity-50"
              >
                <AnimatePresence mode="wait">
                  {input.trim() ? (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Send className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mic"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mic className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              Press Enter to start a new chat, or click a suggestion above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}