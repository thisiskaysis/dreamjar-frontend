import { Hero, HowItWorks, FeaturedCampaigns, ParentsSection, CTASection } from "../../components/homepage";
import "./Homepage.css"

function HomePage() {
    return (
        <main className="home-main">
            <section className="hero">
            <Hero>
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