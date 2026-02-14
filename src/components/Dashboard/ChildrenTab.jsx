import { motion } from "framer-motion";
import ChildCard from "./ChildCard";
import CreateChild from "./ChildActions/CreateChild";
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
  return (
    <>
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
              <p className="text-gray-500">Total Campaigns</p>
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
            className="tab-variant w-90"
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
    </>
  );
}

export default ChildrenTab;
