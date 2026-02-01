import React from "react";
import { JarCharacter } from "../JarCharacter/JarCharacter";


function Hero({children}) {
    return (
        <section className="hero relative w-full h-screen overflow-hidden">
            <div className="hero-background absolute top-0 left-0 w-full h-full">
                <JarCharacter />
                <div className="w-full h-full bg-gradient-to-br from-[#c9b3e0] via-[#fbcdd7] to-[#ffe7a1]"></div>
            </div>

            <div className="hero-content relative z-10 flex items-center justify-center w-full h-full">
                {children}
            </div>
        </section>
    );
}

export default Hero;