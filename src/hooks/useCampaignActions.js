import { useAuth } from "./use-auth";
import postCampaign from "../api/post-campaign";

export function useCampaignActions(){
    const { auth } = useAuth();
    const token = auth?.access;

    const createCampaign = async (childId, data) => postCampaign (childId, data, token);

    return { createCampaign };
}