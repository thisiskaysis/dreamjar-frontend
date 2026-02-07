import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

function ChildCampaignCard({ campaign, childId, setChildren }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className="child-campaign-card">
      {/* Summary panel */}
      <div className="campaign-summary" onClick={handleToggle}>
        <div>
          <h4
            className="campaign-title"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/campaigns/${campaign.id}`);
            }}
          >
            {campaign.title}
          </h4>
          <p>${campaign.amount_raised || 0} / ${campaign.goal}</p>
        </div>
        <span className={`expand-icon ${expanded ? "expanded" : ""}`}>
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
            transition={{ duration: 0.3 }}
          >
            <button
              className="dj-button"
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
