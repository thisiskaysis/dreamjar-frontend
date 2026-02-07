import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

function ChildCampaignCard({ campaign, childId, setChildren }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="child-campaign-card">
      {/* Summary */}
      <div className="campaign-summary" onClick={handleToggle}>
        <h4
          className="campaign-title"
          onClick={(event) => {
            event.stopPropagation(); // Prevent toggle when navigating
            navigate(`/campaigns/${campaign.id}`);
          }}
        >
          {campaign.title}
        </h4>
        <p>
          ${campaign.amount_raised || 0} / ${campaign.goal}{" "}
        </p>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="campaign-details">
          <button
            className="edit-button"
            onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
          >
            Edit Campaign
          </button>
          <DeleteCampaign
            campaignId={campaign.id}
            childId={childId}
            setChildren={setChildren}
          />
        </div>
      )}
    </div>
  );
}

export default ChildCampaignCard;
