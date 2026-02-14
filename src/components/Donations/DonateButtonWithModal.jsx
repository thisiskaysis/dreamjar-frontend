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
      <button
      type="button"
      onClick={openModal}
      className="w-full py-3 mt-10 rounded-xl cursor-pointer bg-indigo-500 text-white hover:bg-indigo-400 transition"
      >
        {children || "Donate"}
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <DonationForm campaignId={campaignId} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}

export default DonateButtonWithModal;
