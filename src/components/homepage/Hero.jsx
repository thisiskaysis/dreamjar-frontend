import React from "react";
import { JarCharacter } from "./JarCharacter.jsx";
import HeroText from "./HeroText.jsx";

function Hero({ children }) {
  return (
    <>
      <section className="hero relative flex flex-col justify-center items-center text-center px-6 py-32 mt-32 overflow-visible">
        {/* Hero content */}
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            Where Little Dreams Grow Big
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow text-center">
            Empowering kids’ dreams, one campaign at a time.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="/dreamjars"
              className="bg-white text-purple-700 font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Browse Campaigns
            </a>
            <a
              href="/account"
              className="bg-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Start a Campaign
            </a>
          </div>
        </div>
      </section>

      {/* Jar container outside hero, absolutely positioned relative to page */}
      <div className="jar-background absolute top-0 left-0 w-full flex justify-center translate-y-90 pointer-events-none z-0">
        <JarCharacter />
      </div>
    </>
  );
}

export default Hero;
