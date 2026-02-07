import useCampaigns from "../../hooks/use-campaigns";
import CampaignCard from "../../components/CampaignCard/CampaignCard.jsx";
import "./CampaignBrowse.css"

function CampaignBrowse() {
    const { campaigns } = useCampaigns();

    return (
        <div>
            <section className="browse-header">
            <h1>Browse DreamJars</h1>
            <p>Insert search/category filter</p>
            </section>
        <div className="campaign-list">
            {campaigns.map((campaignData, key) => {
                return <CampaignCard key={key} campaignData={campaignData} />;
            })}
        </div>
        </div>
    );
}

export default CampaignBrowse;