import { useState, useEffect } from "react";
import getCampaign from "../api/get-campaign";

export default function useCampaign(campaignId) {
    const [campaign, setCampaign] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getCampaign(campaignId)
        .then((campaign) => {
            setCampaign(campaign);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, [campaignId]);

    return { campaign, isLoading, error };
}