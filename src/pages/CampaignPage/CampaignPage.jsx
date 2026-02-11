import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useCampaign from "../../hooks/use-campaign";
import SingleCampaign from "../../components/SIngleCampaign/SingleCampaign";
import DonationCard from "../../components/SIngleCampaign/DonationCard";


function CampaignPage() {

    const { id } = useParams();
    const { campaign, isLoading, error } = useCampaign(id);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if (campaign?.donations) {
            setDonations(campaign.donations);
        }
    }, [campaign]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <SingleCampaign campaign={campaign} />

            {campaign && (
            <DonationCard
            campaignId={campaign.id}
            donations={donations}
            setDonations={setDonations}
            />
            )}
        </div>
    );
}

export default CampaignPage;