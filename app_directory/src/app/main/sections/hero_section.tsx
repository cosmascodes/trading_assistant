"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ChatCard from "@/components/ui/custom_input";

const TradingChart = dynamic(() => import("@/components/ui/trading_chart"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gray-900" />,
});

export default function HeroSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveringGraph, setHoveringGraph] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section className="relative md:min-h-screen w-full overflow-hidden">
      {/* Full-bleed Interactive Graph Background - Responsive */}
      <div
        className={`absolute inset-x-0 top-0 z-0 h-full w-full transition-all duration-300 md:top-0 ${
          hoveringGraph ? "opacity-100" : "opacity-90"
        }`}
        onMouseEnter={() => setHoveringGraph(true)}
        onMouseLeave={() => setHoveringGraph(false)}
      >
        <TradingChart />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-gray-900/95 via-gray-900/85 to-gray-900/95" />

      {/* Responsive Content Container */}
      <div className="relative z-20 mx-auto flex md:min-h-screen flex-col justify-center px-4 text-slate-100 sm:px-6 md:px-8 lg:px-10 pointer-events-none">
        <div className="w-full max-w-3xl mx-auto text-center p-4 md:p-6 pt-32 md:pt-40">
          {/* Responsive Typography */}
          <h3 className="mb-4 font-bold leading-tight text-slate-400 text-3xl md:mb-6 md:text-4xl">
            Hi, I am <span className="text-slate-300">TradeMind</span> AI.
            <br className="hidden sm:inline" />
            I analyze and predict market movements.
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-slate-400 sm:text-base md:mb-8 md:text-lg">
            {`I'm an AI trading assistant specializing in real-time market
            analysis and predictive modeling. Currently focused on delivering
            institutional-grade insights for crypto and equities traders.`}
          </p>

          {/* Responsive Input Container */}
          <div className="mb-6 w-full max-w-2xl mx-auto pointer-events-auto md:mb-8">
            <ChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}