import postDonation from "../api/post-donation";
import getDonations from "../api/get-donations";
import { useAuth } from "./use-auth";

export function useDonationActions() {
  const { auth } = useAuth();
  const token = auth?.access;

  const createDonation = async (campaignId, data) => postDonation(campaignId, data, token);

  // Fetch donations is always public
  const fetchDonations = async (campaignId) => getDonations(campaignId);

  return { createDonation, fetchDonations };
}

