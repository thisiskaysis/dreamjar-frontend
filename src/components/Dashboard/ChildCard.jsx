import { useState } from "react";
import ChildCampaignCard from "./ChildCampaignCard";
import EditChild from "./ChildActions/EditChild";
import getChildAvatar from "./ChildActions/getChildAvatar";
import { motion, AnimatePresence } from "framer-motion";

export default function ChildCard({ child, setChildren, onOpenCampaignModal, onRequestDelete, onRequestCampaignDelete }) {
  const [expanded, setExpanded] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const totalRaised =
    child.campaigns?.reduce((sum, c) => sum + (c.total_raised || 0), 0) || 0;

  return (
    <motion.div className="glass-no-hover p-6 rounded-3xl shadow-md border border-sky-100 flex flex-col gap-4">
      {successMessage && (
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl mb-4">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={getChildAvatar(child)}
            alt={child?.name || "Child"}
            className="w-40 h-40 rounded-full object-cover shadow-sm"
          />
          <div>
            <h3 className="text-5xl font-semibold">
              {child?.name || "Unnamed"}
            </h3>
            <p className="text-gray-500 text-xl pt-2">
              Age: {child?.age || "?"}
            </p>
            <p className="text-gray-700 text-md font-medium mt-1">
              {child.campaigns?.length || 0} DreamJars, ${totalRaised} Raised
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          {/* EDIT CHILD */}
          <EditChild
            childId={child.id}
            childData={child}
            setChildren={setChildren}
            setSuccessMessageParent={setSuccessMessage}
            onRequestDelete={onRequestDelete} // pass the modal trigger
          />
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
          <span
            className={`text-gray-400 text-xl transform transition-transform ${expanded ? "rotate-180" : ""}`}
          >
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
                    onRequestCampaignDelete={onRequestCampaignDelete}
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
