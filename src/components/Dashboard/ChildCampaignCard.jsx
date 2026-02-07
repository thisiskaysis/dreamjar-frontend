import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";

function ChildCampaignCard({ campaign, onDelete }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="child-campaign-card">
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

      {expanded && (
        <div className="campaign-details">
          <button
            className="edit-btn"
            onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
          >
            Edit Campaign
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete && onDelete(campaign.id)}
          >
            Delete Campaign
          </button>
        </div>
      )}
    </div>
  );
}

export default ChildCampaignCard;
