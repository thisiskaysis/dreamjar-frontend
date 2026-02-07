import { useAuth } from "./use-auth";
import postCampaign from "../api/post-campaign";
import deleteCampaign from "../api/delete-campaign";

export function useCampaignActions(){
    const { auth } = useAuth();
    const token = auth?.access;

    const createCampaign = async (childId, data) => postCampaign(childId, data, token);
    const removeCampaign = async (campaignId) => deleteCampaign(campaignId, token);

    return { createCampaign, removeCampaign };
}