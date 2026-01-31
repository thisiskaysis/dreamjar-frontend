import { Link } from "react-router-dom";
import "./CampaignCard.css"

function CampaignCard(props) {
    const { campaignData } = props;

    return (
        <div className="campaign-card">
            <Link to="/campaigns/">
            {/* <img src={image} /> */}
            <h3>{campaignData.title}</h3>
            </Link>
        </div>
    );
}

export default CampaignCard;