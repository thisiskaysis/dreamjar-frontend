import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChildCard from "./ChildCard";
import CreateChild from "./ChildActions/CreateChild";
import { useChildActions } from "../../hooks/useChildActions";
import { useCampaignActions } from "../../hooks/useCampaignActions";
import Modal from "../UI/Modal";

function ChildrenTab({
  children,
  setChildren,
  openCampaignModal,
  showCreateChildModal,
  setShowCreateChildModal,
  totalCampaigns,
  totalRaised,
}) {
  const [childToDelete, setChildToDelete] = useState(null);
  const [campaignToDelete, setCampaignToDelete] = useState(null);
  const { removeChild } = useChildActions();
  const { removeCampaign } = useCampaignActions();

  const handleConfirmChildDelete = async () => {
    if (!childToDelete) return;
    try {
      await removeChild(childToDelete.id);
      setChildren((prev) => prev.filter((c) => c.id !== childToDelete.id));
      setChildToDelete(null);
    } catch (err) {
      alert(err.message || "Failed to delete child");
    }
  };

  const handleConfirmCampaignDelete = async () => {
    if (!campaignToDelete) return;
    try {
      await removeCampaign(
        campaignToDelete.campaignId,
        campaignToDelete.childId,
      );
      setChildren((prev) =>
        prev.map((child) => ({
          ...child,
          campaigns: child.campaigns.filter(
            (c) => c.id !== campaignToDelete.campaignId,
          ),
        })),
      );
      setCampaignToDelete(null);
    } catch (err) {
      alert(err.message || "Failed to delete campaign");
    }
  };

  return (
    <>
      {/* Stats and Add Child Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Stats Panel */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-3xl shadow-md border border-sky-100 text-center">
              <p className="text-gray-500">Total Children</p>
              <p className="text-2xl font-bold">{children.length}</p>
            </div>
            <div className="glass-panel p-4 rounded-3xl shadow-md border border-sky-100 text-center">
              <p className="text-gray-500">Total DreamJars</p>
              <p className="text-2xl font-bold">{totalCampaigns}</p>
            </div>
            <div className="glass-panel p-4 rounded-3xl shadow-md border border-sky-100 text-center">
              <p className="text-gray-500">Total Raised</p>
              <p className="text-2xl font-bold">${totalRaised}</p>
            </div>
          </div>
        </div>

        {/* Add Child Button */}
        <div className="flex items-center justify-center mb-6">
          <button
            className="w-full max-w-64 py-3 rounded-xl cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 transition"
            onClick={() => setShowCreateChildModal(true)}
          >
            Add Child
          </button>
        </div>

        {/* Children Grid */}
        <section>
          {children.length === 0 && (
            <p className="text-gray-500 text-center">
              No children yet. Start by creating one!
            </p>
          )}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                setChildren={setChildren}
                onOpenCampaignModal={openCampaignModal}
                onRequestDelete={setChildToDelete}
                onRequestCampaignDelete={setCampaignToDelete}
              />
            ))}
          </div>
        </section>

        {/* Create Child Modal */}
        <Modal
          isOpen={showCreateChildModal}
          onClose={() => setShowCreateChildModal(false)}
        >
          <CreateChild
            setChildren={setChildren}
            closeModal={() => setShowCreateChildModal(false)}
          />
        </Modal>
      </motion.div>

      {/* DELETE CHILD CONFIRMATION MODAL */}
      <AnimatePresence>
        {childToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setChildToDelete(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-4 text-red-600">
                Confirm Delete
              </h3>
              <p className="mb-6">
                Are you sure you want to delete {childToDelete.name}? This
                action cannot be undone.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  className="flex-1 py-3 cursor-pointer rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                  onClick={() => setChildToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 cursor-pointer rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                  onClick={handleConfirmChildDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CAMPAIGN CONFIRMATION MODAL */}
      <AnimatePresence>
        {campaignToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCampaignToDelete(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-4 text-red-600">
                Confirm Delete
              </h3>
              <p className="mb-6">
                Are you sure you want to delete this DreamJar? This action
                cannot be undone.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                  onClick={() => setCampaignToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"
                  onClick={handleConfirmCampaignDelete}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChildrenTab;
