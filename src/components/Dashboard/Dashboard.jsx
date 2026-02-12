import { useState } from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";
import CreateChild from "./ChildActions/CreateChild";
import ChildCard from "./ChildCard";
import CreateCampaignForm from "../Campaigns/CreateCampaignForm";
import Modal from "../UI/Modal";

function Dashboard({ user }) {
  const [children, setChildren] = useState(user.children || []);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);

  const openCampaignModal = (childId) => {
    setSelectedChildId(childId);
    setShowCampaignModal(true);
  };
  const closeCampaignModal = () => setShowCampaignModal(false);

  // Stats
  const totalCampaigns = children.reduce(
    (sum, c) => sum + (c.campaigns?.length || 0),
    0,
  );
  const totalRaised = children.reduce(
    (sum, c) =>
      sum +
      (c.campaigns?.reduce(
        (csum, camp) => csum + (camp.amount_raised || 0),
        0,
      ) || 0),
    0,
  );

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen bg-gradient-to-br from-[#c9b3e0] via-[#fbcdd7] to-[#ffe7a1]">
      {/* Header */}
      <header className="mb-6">
        <h1 className="flex justify-center">Welcome, {user.first_name}!</h1>
        <p className="flex justify-center">
          Manage your children and campaigns below.
        </p>
      </header>

      {/* Stats Panel & Create Child */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Stats */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="stat-panel">
            <p className="stat-text">Total Children</p>
            <p className="text-2xl font-bold">{children.length}</p>
          </div>
          <div className="stat-panel">
            <p className="stat-text">Total Campaigns</p>
            <p className="text-2xl font-bold">{totalCampaigns}</p>
          </div>
          <div className="stat-panel">
            <p className="stat-text">Total Raised</p>
            <p className="text-2xl font-bold">${totalRaised}</p>
          </div>
        </div>
      </div>

      {/* Create Child */}
      <div className="flex items-center justify-center">
        <button
          className="dj-button w-90"
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

      {/* Campaign Modal */}
      <Modal isOpen={showCampaignModal} onClose={closeCampaignModal}>
        <CreateCampaignForm
          childId={selectedChildId}
          onSuccess={(newCampaign) => {
            setChildren((prevChildren) =>
              prevChildren.map((child) =>
                child.id === newCampaign.child
                  ? {
                      ...child,
                      campaigns: [...(child.campaigns || []), newCampaign],
                    }
                  : child,
              ),
            );
            closeCampaignModal();
          }}
        />
      </Modal>

      {/* Create Child Modal */}
      <Modal
        isOpen={showCreateChildModal}
        onClose={() => setShowCreateChildModal(false)}
      >
        <CreateChild
          user={user}
          setChildren={setChildren}
          closeModal={() => setShowCreateChildModal(false)}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
