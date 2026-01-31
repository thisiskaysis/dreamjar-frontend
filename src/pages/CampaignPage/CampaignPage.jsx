import { useParams } from "react-router-dom";
import useCampaign from "../../hooks/use-campaign";

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
            <h2>{campaign.title}</h2>
            <h3>Created at: {campaign.date_created}</h3>
            <h3>{`Status: ${campaign.is_open}`}</h3>
            <h3>Donations:</h3>
            <ul>
                {campaign.donations?.map((donationData, key) => {
                    return (
                        <li key={key}>
                            {donationData.amount} from {donationData.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CampaignPage;