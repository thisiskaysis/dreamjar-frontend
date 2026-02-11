async function getDonations(campaignId) {
    const url = `${import.meta.env.VITE_API_URL}/campaigns/${campaignId}/donations/`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        const fallbackError = `Error fetching donations for campaign with id ${campaignId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export default getDonations;