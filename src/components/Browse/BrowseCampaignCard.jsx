import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BrowseCampaignCard({ campaign }) {
  const {
    title,
    child_name,
    category,
    goal,
    total_raised,
    image,
    seconds_remaining,
  } = campaign;

  const navigate = useNavigate();

  const remainingText = seconds_remaining
    ? `${Math.floor(seconds_remaining / 86400)} days remaining`
    : null;

  const percentage = goal > 0 ? Math.min((total_raised / goal) * 100, 100) : 0;

  return (
    <motion.div
      className="glass-panel flex flex-col rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 h-full"
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(`/dreamjars/${campaign.id}`)}
    >
      {/* Image */}
      <div className="w-full h-40 bg-gray-100 overflow-hidden">
        <img
          src={image || "/dreamjar-banner.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title & Category */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold hover:text-indigo-600">{title}</h3>
          <span className="inline-block bg-indigo-100 text-center text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Child Name */}
        <p className="text-sm text-gray-600">By {child_name}</p>

        {/* Progress */}
        <div className="w-full bg-gray-200 h-3 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
            style={{
              background: 'linear-gradient(90deg, #f472b6, #6366f1)', // pink → indigo
            }}
          />
        </div>
        <p className="text-gray-600 text-sm">${total_raised} raised</p>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
          <p className="text-gray-500 text-sm">{remainingText}</p>
          <p className="text-xl font-semibold text-right">${goal}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default BrowseCampaignCard;
