import { useState } from "react";
import ChildCampaignCard from "./ChildCampaignCard";
import EditChild from "./ChildActions/EditChild";
import DeleteChild from "./ChildActions/DeleteChild";
import getChildAvatar from "./ChildActions/getChildAvatar";
import { motion, AnimatePresence } from "framer-motion";

export default function ChildCard({ child, setChildren, onOpenCampaignModal }) {
  const [expanded, setExpanded] = useState(true);

  const totalRaised = child.campaigns?.reduce(
    (sum, c) => sum + (c.amount_raised || 0),
    0
  ) || 0;

  return (
    <motion.div
      className="glass-no-hover p-6 rounded-3xl shadow-md border border-sky-100 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={getChildAvatar(child)}
            alt={child?.name || "Child"}
            className="w-20 h-20 rounded-full object-cover shadow-sm"
          />
          <div>
            <h2 className="text-xl font-semibold">{child?.name || "Unnamed"}</h2>
            <p className="text-gray-500">Age: {child?.age || "?"}</p>
            <p className="text-gray-700 font-medium mt-1">
              {child.campaigns?.length || 0} DreamJars, ${totalRaised} Raised
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <EditChild childId={child.id} setChildren={setChildren} />
          <DeleteChild childId={child.id} setChildren={setChildren} />
        </div>
      </div>

      {/* Create Campaign */}
      <button
        className="w-full py-3 rounded-xl cursor-pointer bg-indigo-500 text-white hover:bg-indigo-400 transition"
        onClick={() => onOpenCampaignModal(child.id)}
      >
        Create New DreamJar
      </button>

      {/* Campaigns */}
      <div className="mt-4">
        <div
          className="glass-panel flex justify-between cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="text-2xl font-semibold text-gray-700">DreamJars</h3>
          <span className={`text-gray-400 text-xl transform transition-transform ${expanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="flex flex-col gap-3 mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {child.campaigns?.length > 0 ? (
                child.campaigns.map((c) => (
                  <ChildCampaignCard
                    key={c.id}
                    campaign={c}
                    childId={child.id}
                    setChildren={setChildren}
                  />
                ))
              ) : (
                <p className="text-gray-500 italic">No campaigns yet.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
