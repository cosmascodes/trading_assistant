"use client";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Connect Your Portfolio",
      description: "Securely link your exchange accounts or upload trade history for personalized analysis.",
      icon: "🔗"
    },
    {
      title: "AI Market Analysis",
      description: "Our algorithms process real-time market data to identify trends and opportunities.",
      icon: "🤖"
    },
    {
      title: "Get Actionable Insights",
      description: "Receive clear trade recommendations with risk assessment and profit potential.",
      icon: "💡"
    },
    {
      title: "Execute & Optimize",
      description: "Implement strategies and let AI continuously improve your trading performance.",
      icon: "🚀"
    }
  ];

  return (
    <section className="relative py-20 bg-gray-900/90 backdrop-blur-sm w-full">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-300 sm:text-4xl">
            How TradeMind AI Works
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Institutional-grade trading intelligence simplified for everyone
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-accent/30 transition-all"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 flex items-center justify-center bg-accent text-slate-900 rounded-full font-bold">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400">
                {step.description}
              </p>
              <ArrowRight className="mt-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-6 py-3 bg-accent text-slate-900 font-medium rounded-lg hover:bg-accent/90 transition-colors">
            Start Free Trial
          </button>
          <p className="mt-4 text-sm text-slate-500">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}