import { useState } from "react";
import Modal from "../UI/Modal";
import DonationForm from "../DonationForm/DonationForm";
import "./DonationCard.css";

function DonationCard({ campaign }) {
  const { amount, date_donated, donor_name, comment } = donation;
  const [showDonationModal, setShowDonationModal] = useState(false);

  const openDonationModal = () => {
    setShowDonationModal(true);
  };

  const closeDonationModal = () => {
    setShowDonationModal(false);
  };

  return (
    <>
      <div className="donation-card">
        <div className="donation-content">
          <h1>Donations</h1>
          <h2 className="donation-title">{title}</h2>
          <p className="donation-child">By {child_name}</p>
          <span className="donation-category">{category}</span>
          <div className="donation-progress-bg">
            <div
              className="donation-progress"
              style={{ width: `${percentage_raised}%` }}
            />
          </div>
          <p className="donation-progress-text">
            <strong>${total_raised}</strong> raised of ${goal}
          </p>
          <p className="donation-deadline">{remainingText}</p>
          <p className="donation-description">{description}</p>

          <button className="dj-button" onClick={openDonationModal}>
            Support This Dream ✨
          </button>
        </div>
      </div>

      <Modal isOpen={showDonationModal} onClose={closeDonationModal}>
        <DonationForm
          campaignId={campaign.id}
          onSuccess={(newDonation) => {
            setShowDonationModal((prev) =>
              prev.map((donation) =>
                donation.id === newDonation.id ? newDonation : donation,
              ),
            );
            closeDonationModal();
          }}
        />
      </Modal>
    </>
  );
}

export default DonationCard;
