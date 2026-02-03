async function getUser(token, userId) {
    const url = `${import.meta.env.VITE_API_URL}/parents/${userId}`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Access ${token}`,
        },
        method: "GET" });

    if (!response.ok) {
        const fallbackError = `Error fetching account with id ${userId}`;
        
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getUser;