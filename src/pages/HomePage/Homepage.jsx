import { Hero, HowItWorks, FeaturedCampaigns } from "../../components/homepage";
import "./Homepage.css"

function HomePage() {
    return (
        <div className="homepage w-full min-h-screen flex flex-col">
      <Hero />
      <FeaturedCampaigns />
      <HowItWorks />
      </div>
    );
}

export default HomePage;