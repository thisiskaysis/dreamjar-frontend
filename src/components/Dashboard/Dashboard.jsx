import { useState } from "react";
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
    0
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, {user.first_name}!</h1>
        <p>Manage your children and campaigns below.</p>
      </header>

      {/* Top Panel: Create Child + Stats */}
      <section className="dashboard-top">
        <div className="create-child-section">
          <h2>Create a New Child</h2>
          <button
            className="dj-button"
            onClick={() => setShowCreateChildModal(true)}
          >
            Add Child
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Children</h3>
            <p>{children.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Campaigns</h3>
            <p>{totalCampaigns}</p>
          </div>
        </div>
      </section>

      {/* Children Grid */}
      <section className="children-section">
        {children.length === 0 && (
          <p>No children yet. Start by creating one!</p>
        )}

        <div className="children-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onOpenCampaignModal={openCampaignModal}
              setChildren={setChildren}
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
                  : child
              )
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
