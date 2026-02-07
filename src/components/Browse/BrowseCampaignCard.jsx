import { motion } from "framer-motion";
import "./BrowseCampaignCard.css";

function BrowseCampaignCard({ campaign, onView }) {
  const {
    title,
    child_name,
    category,
    goal,
    total_raised,
    image,
    seconds_remaining,
    percentage_raised,
  } = campaign;

  const remainingText = seconds_remaining
    ? `${Math.floor(seconds_remaining / 86400)} days remaining`
    : null;

  return (
    <motion.div
      className="browse-card"
      whileHover={{ scale: 1.02 }}
      onClick={onView}
    >
      {/* Image */}
      <div className="browse-card-image">
        <img
          src={image || "./dreamjar-banner.svg"}
          alt={title}
          className="browse-card-img"
        />
      </div>

      {/* Content */}
      <div className="browse-card-content">
        <div className="browse-card-header">
          <h3 className="browse-card-title">{title}</h3>
          <span className="browse-card-category">{category}</span>
        </div>
        <p className="browse-card-child">By {child_name}</p>

        {/* Progress */}
        <div className="browse-card-progress-bg">
          <div
            className="browse-card-progress"
            style={{ width: `${percentage_raised}%` }}
          />
        </div>
        <p className="browse-card-progress-text">
          ${total_raised} raised of ${goal}
        </p>

        {/* Deadline */}
        <p className="browse-card-deadline">{remainingText}</p>
      </div>
    </motion.div>
  );
}

export default BrowseCampaignCard;
