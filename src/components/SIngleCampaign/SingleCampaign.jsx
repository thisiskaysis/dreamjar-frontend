import { motion } from "framer-motion";
import "./SingleCampaign.css";

function SingleCampaign({ campaign }) {
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
  } = campaign;

  const remainingText = seconds_remaining
    ? `${Math.floor(seconds_remaining / 86400)} days remaining`
    : "No deadline";

  return (
    <div className="campaign-wrapper">
      <motion.div
        className="campaign-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Image */}
        <div className="campaign-image">
          <img
            src={image || "/dreamjar-banner.svg"}
            alt={title}
          />
        </div>

        {/* Content */}
        <div className="campaign-content">
          <div className="campaign-header">
            <h1 className="campaign-title">{title}</h1>
            <span className="campaign-category">{category}</span>
          </div>

          <p className="campaign-child">By {child_name}</p>

          {/* Progress */}
          <div className="campaign-progress-bg">
            <div
              className="campaign-progress"
              style={{ width: `${percentage_raised}%` }}
            />
          </div>

          <p className="campaign-progress-text">
            <strong>${total_raised}</strong> raised of ${goal}
          </p>

          <p className="campaign-deadline">{remainingText}</p>

          {/* Description */}
          <div className="campaign-description">
            <h2>About this Dream</h2>
            <p>{description}</p>
          </div>

          {/* Donate Button */}
          <button className="dj-button">
            Support This Dream ✨
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleCampaign;
