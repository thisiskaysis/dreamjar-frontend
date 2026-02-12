import { useState, useEffect } from "react";
import "./Dashboard.css";
import CreateChild from "./ChildActions/CreateChild";
import CreateCampaignForm from "../Campaigns/CreateCampaignForm";
import ChildrenTab from "./ChildrenTab";
import DonationsList from "./DonationsList";
import Modal from "../UI/Modal";
import { useMyDonations } from "../../hooks/use-myDonations";

function Dashboard({ user }) {
  const [children, setChildren] = useState(user.children || []);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);
  const [activePage, setActivePage] = useState("children");
  const [donations, setDonations] = useState([]);

  const { fetchMyDonations } = useMyDonations();

  const openCampaignModal = (childId) => {
    setSelectedChildId(childId);
    setShowCampaignModal(true);
  };
  const closeCampaignModal = () => setShowCampaignModal(false);

  useEffect(() => {
    const loadDonations = async () => {
      const data = await fetchMyDonations();
      setDonations(data);
    };
    loadDonations();
  }, []);

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
        <p className="flex justify-center text-gray-600 text-lg">
          Manage your children and campaigns below.
        </p>
        {/* Page Toggle */}
        <div className="flex gap-4 mt-4 justify-center">
          <button
            className={`dj-button tab-variant ${activePage === "children" ? "active" : ""}`}
            onClick={() => setActivePage("children")}
          >
            My Children
          </button>
          <button
            className={`dj-button tab-variant ${activePage === "donations" ? "active" : ""}`}
            onClick={() => setActivePage("donations")}
          >
            My Donations
          </button>
        </div>
      </header>

      {activePage === "children" && (
        <ChildrenTab
          children={children}
          setChildren={setChildren}
          openCampaignModal={openCampaignModal}
          showCreateChildModal={showCreateChildModal}
          setShowCreateChildModal={setShowCreateChildModal}
          totalCampaigns={totalCampaigns}
          totalRaised={totalRaised}
        />
      )}

      {activePage === "donations" && (
        <section>
          <DonationsList donations={donations} />
        </section>
      )}

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
