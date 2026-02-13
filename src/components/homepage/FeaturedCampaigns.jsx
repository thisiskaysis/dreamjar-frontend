import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import useCampaigns from "../../hooks/use-campaigns";
import "./FeaturedCampaigns.css";

function FeaturedCampaigns() {
  const { campaigns, isLoading, error } = useCampaigns();
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) return <p className="text-center py-16">Loading campaigns...</p>;
  if (error) return <p className="text-center py-16 text-red-500">Error loading campaigns: {error.message}</p>;

  const loopedCampaigns = [...campaigns, ...campaigns];
  const baseDuration = 40;
  const slowDuration = 80;

  return (
    <section className="featured-campaigns py-16 px-30">
      <h2 className="text-4xl font-bold text-center mb-12">Featured Campaigns</h2>

      <div className="featured-carousel relative overflow-hidden cursor-grab"
      >
        <motion.div
        className="flex gap-6"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: isHovered ? slowDuration : baseDuration,
          },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        >
        {loopedCampaigns.map((campaign) => {

          return (
            <div key={campaign.id} className="featured-carousel-card glass-panel">
              <img
                src={campaign.image || "./dreamjar-banner.svg"}
                alt={campaign.title}
                className="rounded-xl object-cover w-full h-48 mb-4"
              />
              <h3 className="font-bold text-xl mb-1">{campaign.title}</h3>
              <p className="text-sm mb-2">
                Goal: ${campaign.goal} • Raised: ${campaign.total_raised || 0}
              </p>
              <div className="w-full bg-white h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-purple-700 h-2 rounded-full"
                  style={{ width: `${campaign.percentage_raised}%` }}
                />
              </div>
              <a
                href={`/dreamjars/${campaign.id}`}
                className="my-3 text-center bg-purple-500 text-white py-2 px-4 rounded-xl hover:scale-105 transition-transform"
              >
                Donate
              </a>
            </div>
          );
        })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCampaigns;
