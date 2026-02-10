import { useParams } from "react-router-dom";
import useCampaign from "../../hooks/use-campaign";
import SingleCampaign from "../../components/SIngleCampaign/SingleCampaign";
import DonationCard from "../../components/SIngleCampaign/DonationCard";


function CampaignPage() {

    const { id } = useParams();
    const { campaign, isLoading, error } = useCampaign(id);

    if (isLoading) {
        return (<p>Loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div>
            <SingleCampaign campaign={campaign} />
            <DonationCard campaign={campaign} />
        </div>
    );
}

export default CampaignPage;