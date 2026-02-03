async function getUser(userId) {
    const url = `${import.meta.env.VITE_API_URL}/parents/${userId}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
        const fallbackError = `Error fetching account with id ${userId}`;

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getUser;