import { useNavigate } from "react-router-dom";

function ChildCampaignCard({ campaign }) {
  const navigate = useNavigate();

  const percentage = Math.min(
    Math.round((campaign.amount_raised / campaign.goal) * 100),
    100
  );

  const remainingText = campaign.seconds_remaining
    ? `${Math.floor(campaign.seconds_remaining / 86400)} days left`
    : null;

  return (
    <div className="child-campaign-card">
      {/* Title */}
      <h4
        className="campaign-title"
        onClick={() => navigate(`/dreamjars/${campaign.id}`)}
      >
        {campaign.title}
      </h4>

      {/* Progress bar */}
      <div className="campaign-progress-bar-bg">
        <div
          className="campaign-progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Raised / Goal */}
      <p>
        ${campaign.amount_raised || 0} / ${campaign.goal}
      </p>

      {/* Deadline */}
      <p className="campaign-deadline-text">{remainingText}</p>
    </div>
  );
}

export default ChildCampaignCard;
