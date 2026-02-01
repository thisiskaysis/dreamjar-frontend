import { Hero, HowItWorks, FeaturedCampaigns, ParentsSection, CTASection } from "../../components/homepage";
import "./Homepage.css"
import TitleAnimation from "../../components/homepage/TitleAnimation/TitleAnimation";

function HomePage() {
    return (
        <main>
            <section className="hero">
            <Hero>
            <TitleAnimation />
            </Hero>
            </section>
            <HowItWorks />
            <FeaturedCampaigns />
            <ParentsSection />
            <CTASection />
        </main>
    );
}

export default HomePage;