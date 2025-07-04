import HeroSection from "./main/sections/hero_section";
import HowItWorks from "./main/sections/how_it_works";
import { NewsSection } from "./main/sections/news_section";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection/>
      <HowItWorks/>
      <NewsSection/>
    </div>
  );
}
