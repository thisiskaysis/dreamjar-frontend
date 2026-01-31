import { Hero, HowItWorks, FeaturedCampaigns, ParentsSection, CTASection } from "../../components/homepage";
import "./Homepage.css"

function HomePage() {
    return (
        <main>
            <Hero />
            <HowItWorks />
            <FeaturedCampaigns />
            <ParentsSection />
            <CTASection />
        </main>
    );
}

export default HomePage;