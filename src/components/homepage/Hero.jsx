import React from "react";
import { JarCharacter } from "./JarCharacter.jsx";
import { HeroText } from "./HeroText.jsx";

function Hero({ children }) {
  return (
    <section className="hero relative w-full min-h-screen overflow-hidden">
      <div className="hero-background absolute top-0 left-0 w-full h-full">
        <div className="relative">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
            <HeroText />
          </div>
          <JarCharacter />
        </div>
        <div className="w-full h-full bg-gradient-to-br from-[#c9b3e0] via-[#fbcdd7] to-[#ffe7a1]"></div>
      </div>

      <div className="hero-content relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </section>
  );
}

export default Hero;
