import ProgressBar from "../components/ProgressBar/ProgressBar.jsx";
import ProgressJar from "../components/ProgressJar/ProgressJar.jsx";
import { useParams } from "react-router-dom";
import useCampaign from "../hooks/use-campaign.js";

function CampaignPage() {

    const { id } = useParams();
    const { campaign, isLoading, error } = useCampaign(id);
    
    return (
        <div>
    <div className="jar-container">
        <ProgressJar /></div>
        <ProgressBar />
    <h2>{campaign.title}</h2>
    <h3>Created at: {campaign.date_created}</h3>
    <h3>{`Status: ${fundraiser.is_open}`}</h3>
    <h3>Donations:</h3>
    <ul>
        {campaign.donations.map((donationData, key) => {
            return (
                <li key={key}>
                    {donationData.amount} from {donationData.donor_name}
                </li>
                );
            })}
        </ul>
    </div>        
    );
}

export default CampaignPage;