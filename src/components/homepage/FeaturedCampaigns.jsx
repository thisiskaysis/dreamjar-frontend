import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useCampaigns from "../../hooks/use-campaigns";
import "./FeaturedCampaigns.css";

function FeaturedCampaigns() {
  const { campaigns, isLoading, error } = useCampaigns();
  const carouselRef = useRef(null);

  // Animated scroll
  const animationRef = useRef(null);
  const speed = 0.5;

  // Mouse drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.5; // scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const autoScroll = () => {
      if (!isDown.current) {
        el.scrollLeft += speed;

        // Loop
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [])

  if (isLoading)
    return <p className="text-center py-16">Loading campaigns...</p>;

  if (error)
    return (
      <p className="text-center py-16 text-red-500">
        Error loading campaigns: {error.message}
      </p>
    );

  return (
    <section className="featured-campaigns py-16 px-0">
      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Campaigns
      </h2>

      <div
        ref={carouselRef}
        className="featured-carousel"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="featured-track">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="featured-carousel-card glass-panel"
            >
              <img
                src={campaign.image || "./dreamjar-banner.svg"}
                alt={campaign.title}
                className="rounded-xl object-cover w-full h-48 mb-4"
              />

              <h3 className="font-bold text-xl mb-1">
                {campaign.title}
              </h3>

              <p className="text-sm mb-2">
                Goal: ${campaign.goal} • Raised: $
                {campaign.total_raised || 0}
              </p>

              <div className="w-full my-6 bg-gray-200 h-3 rounded-full overflow-hidden">
                <motion.div
                  className="h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${campaign.percentage_raised}%` }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background:
                      "linear-gradient(90deg, #f472b6, #6366f1)",
                  }}
                />
              </div>

              <a
                href={`/dreamjars/${campaign.id}`}
                className="my-3 text-center bg-purple-500 text-white py-2 px-4 rounded-xl hover:scale-105 transition-transform"
              >
                Donate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCampaigns;
