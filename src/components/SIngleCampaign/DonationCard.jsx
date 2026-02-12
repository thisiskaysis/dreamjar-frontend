import { useState, useEffect, useMemo } from "react";
import DonateButtonWithModal from "../../components/Donations/DonateButtonWithModal";
import { useDonationActions } from "../../hooks/useDonationActions";
import "./DonationCard.css";

function DonationCard({ campaignId, donations = [], onDonateSuccess }) {
  // Always display newest donations first
  const sortedDonations = useMemo(() => {
    return [...donations].sort(
      (a, b) => new Date(b.date_donated) - new Date(a.date_donated),
    );
  }, [donations]);

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
                  ${donation.amount} from {donation.donor_name || "Anonymous"}
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

          <DonateButtonWithModal
            campaignId={campaignId}
            onSuccess={onDonateSuccess}
          >
            Donate Now
          </DonateButtonWithModal>
        </div>
      </div>
    </div>
  );
}

export default DonationCard;
