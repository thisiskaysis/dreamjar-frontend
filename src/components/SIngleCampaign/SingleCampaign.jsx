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
    <div className="single-wrapper">
      <motion.div
        className="single-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Image */}
        <div className="single-image">
          <img
            src={image || "/dreamjar-banner.svg"}
            alt={title}
          />
        </div>

        {/* Content */}
        <div className="single-content">
          <div className="single-header">
            <h1 className="single-title">{title}</h1>
            <span className="single-category">{category}</span>
          </div>

          <p className="single-child">By {child_name}</p>

          {/* Progress */}
          <div className="single-progress-bg">
            <div
              className="single-progress"
              style={{ width: `${percentage_raised}%` }}
            />
          </div>

          <p className="single-progress-text">
            <strong>${total_raised}</strong> raised of ${goal}
          </p>

          <p className="single-deadline">{remainingText}</p>

          {/* Description */}
          <div className="single-description">
            <h3>About this Dream</h3>
            <p>{description}</p>
          </div>

          {/* Donate Button */}
          <button className="single-donate-btn">
            Support This Dream ✨
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default SingleCampaign;
