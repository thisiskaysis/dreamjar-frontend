import { useState } from "react";
import "./Dashboard.css";
import Modal from "../UI/Modal";
import CreateCampaignForm from "../Campaigns/CreateCampaignForm";
import CreateChild from "./ChildActions/CreateChild";
import DeleteChild from "./ChildActions/DeleteChild";
import EditChild from "./ChildActions/EditChild";

function Dashboard({ user }) {
  const [children, setChildren] = useState(user.children || []);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const openCampaignModal = (childId) => {
    setSelectedChildId(childId);
    setShowCampaignModal(true);
  };

  const closeCampaignModal = () => {
    setShowCampaignModal(false);
  }

  return (
  <div className="dashboard">
    <h1>Welcome, {user.first_name}</h1>

    <CreateChild user={user} setChildren={setChildren} />

    <div className="children-section">
      {children.length === 0 && <p>No children yet.</p>}

      {children.map((child) => (
        <div key={child.id} className="child-card">
          <h2>{child.name}</h2>
          <p>Age: {child.age}</p>

          <div className="child-actions">
            <button onClick={() => openCampaignModal(child.id)}>
              Create Campaign
            </button>

            <EditChild childId={child.id} setChildren={setChildren} />
            <DeleteChild childId={child.id} setChildren={setChildren} />
          </div>

          <div className="campaign-list">
            {child.campaigns?.map((campaign) => (
              <div key={campaign.id} className="campaign-item">
                <h4>{campaign.title}</h4>
                <p>
                  ${campaign.amount_raised} / ${campaign.goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* ONE modal only */}
    <Modal isOpen={showCampaignModal} onClose={closeCampaignModal}>
      <CreateCampaignForm
        childId={selectedChildId}
        onSuccess={(newCampaign) => {
          setChildren((prevChildren) =>
          prevChildren.map((child) =>
          child.id === selectedChildId
        ? { ...child, campaigns: [...(child.campaigns || []), newCampaign] }
      : child
    )
  );
  closeCampaignModal();
}}
      />
    </Modal>
  </div>
);
}

export default Dashboard;