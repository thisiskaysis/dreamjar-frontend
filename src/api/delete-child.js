async function deleteChild(childId, token) {
    const url = `${import.meta.env.VITE_API_URL}/children/${childId}/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete child");
    }

    return true;
}

export default deleteChild;