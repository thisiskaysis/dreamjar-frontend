async function postDonation(campaignId, data, token) {
    const url = `${import.meta.env.VITE_API_URL}/campaigns/${campaignId}/donations/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
    });


    const resData = await response.json();

    if (!response.ok) {
        const fallbackError = "Error creating donation";
        const errorMessage = resData?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return resData;
}

export default postDonation;