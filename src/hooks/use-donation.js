import postDonation from "../api/post-donation";
import { useAuth } from "./use-auth";

export function useDonation(){
    const { auth } = useAuth();
    const token = auth?.access;

    const createDonation = async (campaignId, data) => postDonation(campaignId, data, token);

    return { createDonation };
}