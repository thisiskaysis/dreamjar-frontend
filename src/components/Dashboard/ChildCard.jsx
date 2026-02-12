import { motion } from "framer-motion";
import ChildCampaignCard from "./ChildCampaignCard";
import EditChild from "./ChildActions/EditChild";
import DeleteChild from "./ChildActions/DeleteChild";
import getChildAvatar from "./ChildActions/getChildAvatar";

function ChildCard({ child, setChildren, onOpenCampaignModal }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center text-xl font-bold mb-2">
        <img
          src={getChildAvatar(child)}
          alt={child?.name || "Child"}
          className="object-cover w-full h-full"
        />
      </div>

      <h2 className="font-semibold text-lg">{child?.name || "Unnamed"}</h2>
      <p className="text-gray-500 text-sm mb-3">Age: {child?.age || "?"}</p>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap justify-center mb-3">
        <button
          className="dj-button bg-pink-400 hover:bg-pink-500 text-white py-1 px-3 rounded-md text-sm"
          onClick={() => onOpenCampaignModal(child.id)}
        >
          Create Campaign
        </button>
        <EditChild childId={child.id} setChildren={setChildren} />
        <DeleteChild childId={child.id} setChildren={setChildren} />
      </div>

      {/* Campaigns */}
      {child.campaigns?.length > 0 && (
        <div className="flex flex-col gap-2 w-full mt-2">
          {child.campaigns.map((c) => (
            <ChildCampaignCard
              key={c.id}
              campaign={c}
              childId={child.id}
              setChildren={setChildren}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ChildCard;
