"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Mic, Send, Globe } from "lucide-react";

export default function ChatCard() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="py-4">
      <div className="max-w-2xl space-y-4">
        <div className="flex justify-center items-center flex-col">
          <div className="rounded-2xl p-4 border bg-gray-800 mb-4 w-full">
            <div className="flex flex-row items-center">
              <Textarea
                ref={textareaRef}
                placeholder="Ask about market trends or analyze assets..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-lg text-slate-400 w-full outline-0 resize-none p-0 py-4 shadow-none border-0 placeholder-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-hide"
              />
            </div>
            <div className="flex justify-between flex-row mt-2">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-slate-400 hover:bg-slate-300 text-slate-800"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="h-8 px-1 rounded-full bg-slate-400 hover:bg-slate-300 text-slate-800 text-xs flex items-center gap-1"
                >
                  <Globe className="h-3 w-3" />
                  News
                </Button>
              </div>

              <Button
                size="icon"
                className="h-6 w-6 bg-accent rounded-lg shadow-none text-slate-800 p-4 overflow-hidden relative"
              >
                <AnimatePresence mode="wait">
                  {input.trim() ? (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Send className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="mic"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Mic className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center-safe flex-wrap gap-3 font-mono">
            {[
              "Market Scan",
              "Portfolio Review",
              "Predict Trends",
              "Risk Analysis",
            ].map((action) => (
              <button
                key={action}
                className="rounded-md bg-accent/10 px-3 py-1.5 text-xs text-accent ring-1 ring-inset ring-slate-800 transition-all hover:text-cyan-300 hover:ring-accent/30 sm:text-sm"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
