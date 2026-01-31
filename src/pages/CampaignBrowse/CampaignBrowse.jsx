import useCampaigns from "../../hooks/use-campaigns";
import CampaignCard from "../../components/CampaignCard/CampaignCard.jsx";
import "./CampaignBrowse.css"

function CampaignBrowse() {
    const { campaigns } = useCampaigns();

    return (
        <div id="campaign-list">
            {campaigns.map((campaignData, key) => {
                return <CampaignCard key={key} campaignData={campaignData} />;
            })}
        </div>
    );
}

export default CampaignBrowse;