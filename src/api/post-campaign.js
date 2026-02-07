async function postCampaign(childId, data, token) {
    const url = `${import.meta.env.VITE_API_URL}/children/${childId}/campaigns/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
        const fallbackError = "Error creating campaign";
        const errorMessage = resData?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return resData;
}

export default postCampaign;