async function getMyDonations(token) {
    const url = `${import.meta.env.VITE_API_URL}/donations/`;

    const response = await fetch(url, {
        method: "GET",
        headers: token
            ? {"Authorization": `Bearer ${token}`,
               "Content-Type": "application/json"}
            : {},
    });

    if (!response.ok) {
        const fallbackError = "Error fetching donations";
        const data = await response.json().catch(() => { throw new Error(fallbackError); });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export default getMyDonations;
