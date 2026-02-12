import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

function ChildCampaignCard({ campaign, childId, setChildren }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const percentage = Math.min(
    Math.round((campaign.amount_raised / campaign.goal) * 100),
    100
  );

  const remainingText = campaign.seconds_remaining
    ? `${Math.floor(campaign.seconds_remaining / 86400)} days left`
    : "No deadline";

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="child-campaign-card">
      {/* Summary */}
      <div className="campaign-summary">
        <div>
          <h4
            className="campaign-title"
            onClick={() => navigate(`/dreamjars/${campaign.id}`)}
          >
            {campaign.title}
          </h4>
          <div className="campaign-progress-bar-bg">
            <div
              className="campaign-progress-bar-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="campaign-raised-goal">
            ${campaign.amount_raised || 0} / ${campaign.goal}
          </p>
          <p className="campaign-deadline-text">{remainingText}</p>
        </div>

        <span
          className={`expand-icon ${expanded ? "expanded" : ""}`}
          onClick={handleToggle}
        >
          ▼
        </span>
      </div>

      {/* Expanded actions */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="campaign-actions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "ease", duration: 0.25 }}
          >
            <button
              className="dj-button w-full"
              onClick={() => navigate(`/campaigns/${campaign.id}/edit`)}
            >
              Edit Campaign
            </button>
            <DeleteCampaign
              campaignId={campaign.id}
              childId={childId}
              setChildren={setChildren}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChildCampaignCard;
