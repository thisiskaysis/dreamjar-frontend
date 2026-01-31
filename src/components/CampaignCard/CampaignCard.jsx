import { Link } from "react-router-dom";
import "./CampaignCard.css"

function CampaignCard(props) {
    const { campaignData } = props;
    const campaignLink = `dreamjars/${campaignData.id}`;

    return (
        <div className="campaign-card">
            <Link to={campaignLink}>
            <h3>{campaignData.title}</h3>
            </Link>
        </div>
    );
}

export default CampaignCard;