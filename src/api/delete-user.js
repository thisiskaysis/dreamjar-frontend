async function deleteUser(userId, token) {
    const url = `${import.meta.env.VITE_API_URL}/parents/${userId}/`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to delete your account")
    }

    return true;
}

export default deleteUser;