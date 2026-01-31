import { useState, useEffect } from "react";
import getCampaigns from "../api/get-campaigns";

export default function useCampaigns() {
    const [campaigns, setCampaigns] = useState ([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getCampaigns()
        .then((campaigns) => {
            setCampaigns(campaigns);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return { campaigns, isLoading, error };
}