import HeroSection from "./main/sections/hero_section";
import HowItWorks from "./main/sections/how_it_works";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection/>
      <HowItWorks/>
    </div>
  );
}
