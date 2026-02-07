async function deleteCampaign(campaignId, token) {
    const url = `${import.meta.env.VITE_API_URL}/campaigns/${campaignId}/`;

    const reponse = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete campaign")
    }

    return true;
}

export default deleteCampaign;