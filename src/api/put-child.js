async function putChild(childId, data, token) {
    const url = `${import.meta.env.VITE_API_URL}/children/${childId}/`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
        const fallbackError = "Error updating details"
        const errorMessage = resData?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return resData;
}

export default putChild;