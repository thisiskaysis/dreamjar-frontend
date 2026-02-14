import getMyDonations from "../api/get-my-donations";
import { useAuth } from "./use-auth";

export function useMyDonations() {
  const { auth } = useAuth();

  // fetchMyDonations is just a function we return — call it in Dashboard
  const fetchMyDonations = async () => {
    const token = auth?.access || window.localStorage.getItem("access");
    if (!token) return [];

    try {
      const data = await getMyDonations(token);
      return data;
    } catch (err) {
      console.error("Error fetching donations:", err);
      return [];
    }
  };

  return { fetchMyDonations };
}
