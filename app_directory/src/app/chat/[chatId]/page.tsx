"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Mic, Loader2, Copy, ThumbsUp, ThumbsDown } from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  response?: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatData {
  sessionId: string;
  initialMessage?: string;
  autoSend?: boolean; // Flag to trigger automatic sending
}

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize chat data from sessionStorage
  useEffect(() => {
    if (chatId && !isInitialized) {
      try {
        const chatDataStr = sessionStorage.getItem(`chat_${chatId}`);
        if (chatDataStr) {
          const chatData: ChatData = JSON.parse(chatDataStr);
          setSessionId(chatData.sessionId);
          
          console.log('Loaded chat data:', chatData);
          
          // Send initial message if exists and autoSend is true
          if (chatData.initialMessage && chatData.autoSend) {
            console.log('Auto-sending initial message:', chatData.initialMessage);
            
            // Use setTimeout to ensure the component is fully mounted
            setTimeout(() => {
              sendMessage(chatData.initialMessage!);
            }, 100);
            
            // Clear initial message and autoSend flag to prevent re-sending
            const updatedData = { sessionId: chatData.sessionId };
            sessionStorage.setItem(`chat_${chatId}`, JSON.stringify(updatedData));
          }
        } else {
          // Fallback: generate new session if no data found
          const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          setSessionId(newSessionId);
          sessionStorage.setItem(`chat_${chatId}`, JSON.stringify({ sessionId: newSessionId }));
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
      }
      setIsInitialized(true);
    }
  }, [chatId, isInitialized]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !sessionId) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: messageText,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log('Sending message with session:', { 
        message: messageText, 
        sessionId: sessionId,
        chatId: chatId
      });

      const requestBody = {
        message: messageText,
        session_id: sessionId,
      };
      
      console.log('Request body:', requestBody);
      
      // Use Next.js API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Success response:', data);

      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, response: data.response || 'No response received', isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, response: 'Sorry, there was an error processing your message. Please try again.', isLoading: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    sendMessage(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

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
          <p className="text-sm text-gray-400">Chat: {chatId}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-accent rounded-full"></div>
              </div>
              <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
              <p className="text-gray-400">Ask me about market trends, portfolio analysis, or trading strategies.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-accent text-gray-900 rounded-2xl rounded-br-md px-4 py-3 max-w-[70%]">
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>

              {/* AI Response */}
              {(msg.response || msg.isLoading) && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3 max-w-[70%] relative group">
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap text-gray-200">{msg.response}</p>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(msg.response!)}
                            className="h-7 px-2 text-gray-400 hover:text-white"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-gray-400 hover:text-green-400"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-gray-400 hover:text-red-400"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-4 flex items-end gap-3">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                placeholder="Ask about market trends, analyze assets, or get trading insights..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="min-h-[44px] max-h-32 text-white bg-transparent border-0 resize-none p-0 placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                rows={1}
              />
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 bg-accent hover:bg-accent/90 text-gray-900 rounded-xl flex-shrink-0"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </motion.div>
                ) : input.trim() ? (
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
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}