import useCampaigns from "../../hooks/use-campaigns.js";
import BrowseCampaignCard from "../../components/Browse/BrowseCampaignCard.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BrowseCampaignPage.css";

function BrowseCampaignPage() {
  const { campaigns, isLoading, error } = useCampaigns();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const navigate = useNavigate();

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    // Later: navigate to single campaign page
  };

  if (isLoading) return <p className="loading">Loading campaigns...</p>;
  if (error) return <p className="error">Error loading campaigns</p>;

  return (
    <div className="browse-page">
      <h1 className="browse-page-title">Browse Campaigns</h1>
      {campaigns.length === 0 ? (
        <p className="no-campaigns">No campaigns available at the moment.</p>
      ) : (
        <div className="browse-grid">
          {campaigns.map((campaign) => (
            <BrowseCampaignCard
              key={campaign.id}
              campaign={campaign}
              onView={() => handleViewCampaign(campaign)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseCampaignPage;