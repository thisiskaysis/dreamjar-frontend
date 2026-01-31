import { JarCharacter } from "../JarCharacter/JarCharacter";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-background">
                <JarCharacter />
            </div>
        </section>
    );
}

export default Hero;