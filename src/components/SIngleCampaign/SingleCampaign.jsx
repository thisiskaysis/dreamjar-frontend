import DonateButtonWithModal from "../Donations/DonateButtonWithModal";
import { motion } from "framer-motion";
import "./SingleCampaign.css";

function SingleCampaign({ campaign, onDonateSuccess }) {
  const {
    title,
    child_name,
    category,
    goal,
    total_raised,
    image,
    seconds_remaining,
    percentage_raised,
    description,
    date_created,
  } = campaign;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  const remainingText = seconds_remaining
    ? `${Math.floor(seconds_remaining / 86400)} days remaining`
    : null;

  const percentage =
    goal > 0 ? Math.min((total_raised / goal) * 100, 100) : 0;

  return (
    <div className="campaign-wrapper">
      <div className="campaign-card">
        {/* Image */}
        <div className="glass-panel campaign-image">
          <img src={image || "/dreamjar-banner.svg"} alt={title} />
        </div>

        {/* Content */}
        <div className="campaign-content">
          <div className="campaign-header">
            <h1 className="campaign-title">{title}</h1>
            <span className="campaign-category">{category}</span>
          </div>
          <div className="campaign-header mb-8">
            <p className="campaign-child">By {child_name}</p>
            <p className="campaign-deadline text-right">
              {formatDate(date_created)}
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
            <motion.div
              className="bg-pink-400 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="campaign-header mb-8">
          <p className="campaign-progress-text">
            <strong>${total_raised}</strong> of ${goal} raised
          </p>
          <p className="campaign-deadline text-right">{remainingText}</p>
          </div>

          {/* Description */}
          <div className="glass-panel mt-2 campaign-description">
            <h2>About this Dream</h2>
            <div className="my-8">
              <p>{description}</p>
            </div>
          </div>

          {/* Donate Button */}
          <DonateButtonWithModal
            campaignId={campaign.id}
            onSuccess={onDonateSuccess}
          >
            Support This Dream ✨
          </DonateButtonWithModal>
        </div>
      </div>
    </div>
  );
}

export default SingleCampaign;
