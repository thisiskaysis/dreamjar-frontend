import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

function ChildCampaignCard({ campaign, childId, setChildren }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const percentage = Math.min(
    Math.round((campaign.amount_raised / campaign.goal) * 100),
    100,
  );

  const remainingText = campaign.seconds_remaining
    ? `${Math.floor(campaign.seconds_remaining / 86400)} days left`
    : "No deadline";

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="campaign-dropdown">
      {/* Summary */}
      <div className="flex justify-between items-start p-3 cursor-pointer">
        <div
          className="flex-1"
          onClick={() => navigate(`/dreamjars/${campaign.id}`)}
        >
          <h4 className="text-2xl">{campaign.title}</h4>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <motion.div
              className="bg-pink-400 h-2 rounded-full"
              style={{ width: `${percentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-s text-gray-500 mt-1">
            ${campaign.amount_raised || 0} / ${campaign.goal}
          </p>
          <p className="text-s text-gray-400">{remainingText}</p>
        </div>

        <span
          className={`text-gray-400 text-xl ml-2 transform transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          onClick={handleToggle}
        >
          ▼
        </span>
      </div>

      {/* Expanded Actions */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="flex flex-col gap-2 p-3 border-t border-gray-200 items-center"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="dj-button w-90"
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
    </motion.div>
  );
}

export default ChildCampaignCard;
