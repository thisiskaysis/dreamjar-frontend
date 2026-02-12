import { useState } from "react";
import Modal from "../UI/Modal";
import DonationForm from "./DonationForm";

function DonateButtonWithModal({ campaignId, onSuccess, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (!campaignId) return;
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSuccess = (newDonation) => {
    if (onSuccess) onSuccess(newDonation);
    closeModal();
  };

  return (
    <>
      <button type="button" onClick={openModal} className="dj-button w-full">
        {children || "Donate"}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <DonationForm campaignId={campaignId} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default DonateButtonWithModal;
