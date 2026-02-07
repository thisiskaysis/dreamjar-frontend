async function postChild(parentId, data, token) {
    const url = `${import.meta.env.VITE_API_URL}/parents/${parentId}/children/`;

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
        throw resData;
    }

    return resData;
}

export default postChild;