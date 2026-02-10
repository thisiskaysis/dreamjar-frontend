import { useState } from "react";
import Modal from "../UI/Modal";
import DonationForm from "../DonationForm/DonationForm";
import "./DonationCard.css";

function DonationCard({ campaignId }) {
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
            <p className="donation-amount">{`$${amount} from ${donor_name}`}</p>
            <p className="donation-comment">{comment}</p>
            <p className="donation-date">{new Date(date_donated).toLocaleDateString()}</p>
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
