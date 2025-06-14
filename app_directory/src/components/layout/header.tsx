"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Show header when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlHeader);
      return () => window.removeEventListener("scroll", controlHeader);
    }
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header
        className={` fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? " backdrop-blur-sm translate-y-0" : "-translate-y-full"
        }`}
      >
        <div>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0 md:absolute md:left-8">
                <Image
                  src="/logos/gptchart.webp"
                  alt="AI Trading Assistant"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>

              {/* Centered Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8 font-mono mx-auto">
                <a
                  href="#features"
                  className="text-slate-300 hover:text-accent transition-colors duration-200 text-sm"
                >
                  <span className="text-accent">01.</span> Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-slate-300 hover:text-accent transition-colors duration-200 text-sm"
                >
                  <span className="text-accent">02.</span> How It Works
                </a>
                <a
                  href="#pricing"
                  className="text-slate-300 hover:text-accent transition-colors duration-200 text-sm"
                >
                  <span className="text-accent">03.</span> Pricing
                </a>
              </nav>

              {/* Right-aligned CTA for desktop */}
              <div className="hidden md:block md:absolute md:right-8">
                <a href="/">
                <InteractiveHoverButton className="px-6 py-2 border border-accent text-accent text-sm font-mono">
                  Get Started
                </InteractiveHoverButton></a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-slate-300 hover:text-accent transition-colors duration-200 p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden bg-slate-900 border-b border-slate-700 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-slate-300 hover:text-accent transition-colors duration-200 text-sm font-mono py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-accent">01.</span> Features
            </a>
            <a
              href="#how-it-works"
              className="block text-slate-300 hover:text-accent transition-colors duration-200 text-sm font-mono py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-accent">02.</span> How It Works
            </a>
            <a
              href="#pricing"
              className="block text-slate-300 hover:text-accent transition-colors duration-200 text-sm font-mono py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-accent">03.</span> Pricing
            </a>
            <a
              href="#contact"
              className="inline-block mt-4 px-4 py-2 border border-accent text-accent rounded hover:bg-accent hover:text-slate-900 transition-all duration-200 text-sm font-mono"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
