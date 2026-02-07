import { useState } from "react";
import Modal from "../UI/Modal";
import CreateCampaignForm from "../Campaigns/CreateCampaignForm";
import DeleteChild from "./ChildActions/DeleteChild";
import EditChild from "./ChildActions/EditChild";
import ChildCampaignCard from "./ChildCampaignCard";
import deleteCampaign from "../../api/delete-campaign";

function ChildCard({ children, setChildren }) {
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  const openCampaignModal = (childId) => {
    setSelectedChildId(childId);
    setShowCampaignModal(true);
  };

  const closeCampaignModal = () => setShowCampaignModal(false);

  return (
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

          {child.campaigns?.map((campaign) => (
            <ChildCampaignCard
              key={campaign.id}
              campaign={campaign}
              onDelete={async (campaignId) => {
                const confirmDelete = confirm("Delete this campaign?");
                if (!confirmDelete) return;

                // Call API to delete campaign
                await deleteCampaign(campaignId);

                // Update child state
                setChildren((prevChildren) =>
                  prevChildren.map((c) =>
                    c.id === child.id
                      ? {
                          ...c,
                          campaigns: c.campaigns.filter(
                            (camp) => camp.id !== campaignId
                          ),
                        }
                      : c
                  )
                );
              }}
            />
          ))}
        </div>
      ))}

      {/* ONE modal only */}
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
    </div>
  );
}

export default ChildCard;
