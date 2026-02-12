import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useCampaign from "../../hooks/use-campaign";
import { useDonationActions } from "../../hooks/useDonationActions";
import SingleCampaign from "../../components/SIngleCampaign/SingleCampaign";
import DonationCard from "../../components/SIngleCampaign/DonationCard";

function CampaignPage() {
  const { id } = useParams();
  const { fetchDonations } = useDonationActions();
  const { campaign: fetchedCampaign, isLoading, error } = useCampaign(id);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!fetchedCampaign) return;
    setCampaign(fetchedCampaign);

    async function loadDonations() {
      try {
        const fetched = await fetchDonations(fetchedCampaign.id);
        setDonations(fetched);
      } catch (err) {
        console.error(err);
      }
    }
    loadDonations();
  }, [fetchedCampaign]);

  const handleDonationSuccess = (newDonation) => {
    setDonations((prevDonations) => [newDonation, ...prevDonations]);

    setCampaign((prevCampaign) => {
      const newTotal = prevCampaign.total_raised + newDonation.amount;
      const newPercentage = Math.min((newTotal / prevCampaign.goal) * 100, 100);
      return {
        ...prevCampaign,
        total_raised: newTotal,
        percentage_raised: newPercentage,
      };
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {campaign && (
        <>
          <SingleCampaign
            campaign={campaign}
            onDonateSuccess={handleDonationSuccess}
          />

          <DonationCard
            campaignId={campaign.id}
            donations={donations}
            onDonateSuccess={handleDonationSuccess}
          />
        </>
      )}
    </div>
  );
}

export default CampaignPage;
