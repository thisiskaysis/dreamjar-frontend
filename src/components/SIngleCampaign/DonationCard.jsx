import { useState, useEffect, useMemo } from "react";
import Modal from "../UI/Modal";
import DonationForm from "../DonationForm/DonationForm";
import { useDonationActions } from "../../hooks/useDonationActions";
import "./DonationCard.css";

function DonationCard({ campaignId, donations = [], setDonations }) {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const { fetchDonations } = useDonationActions();

  const openDonationModal = () => setShowDonationModal(true);
  const closeDonationModal = () => setShowDonationModal(false);

  // Fetch donations when campaignId changes
  useEffect(() => {
    if (!campaignId) return;

    let isMounted = true; // avoid state update if unmounted

    async function loadDonations() {
      try {
        const fetched = await fetchDonations(campaignId);
        if (isMounted && setDonations) setDonations(fetched);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    }

    loadDonations();

    return () => {
      isMounted = false;
    };
  }, [campaignId, setDonations]); // <- only campaignId and setDonations

  // Always display newest donations first
  const sortedDonations = useMemo(() => {
    return [...donations].sort(
      (a, b) => new Date(b.date_donated) - new Date(a.date_donated)
    );
  }, [donations]);

  // Handle a new donation from the form
  const handleSuccess = (newDonation) => {
    if (setDonations) {
      setDonations((prev) => [newDonation, ...prev]);
    }
    closeDonationModal();
  };

  return (
    <div className="donation-wrapper">
      <div className="donation-card">
        <div className="donation-content">
          <h1>Donations</h1>

          {sortedDonations.length === 0 ? (
            <p className="no-donations">
              No donations yet. Be the first to donate! 💜
            </p>
          ) : (
            sortedDonations.map((donation) => (
              <div key={donation.id} className="donation-item">
                <p className="donation-amount">
                  ${donation.amount} from {donation.donor_name}
                </p>
                {donation.comment && (
                  <p className="donation-comment">{donation.comment}</p>
                )}
                <p className="donation-date">
                  {new Date(donation.date_donated).toLocaleDateString()}
                </p>
              </div>
            ))
          )}

          <button onClick={openDonationModal} className="dj-button">
            Donate Now
          </button>
        </div>
      </div>

      <Modal isOpen={showDonationModal} onClose={closeDonationModal}>
        <DonationForm campaignId={campaignId} onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
}

export default DonationCard;
