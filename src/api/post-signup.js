async function postSignUp(credentials) {
    const url = `${import.meta.env.VITE_API_URL}/parents/`;


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
    const fallbackError = "Error trying to sign up";

    let data = null;

    try {
        data = await response.json();
    } catch {
        throw new Error(fallbackError);
    }

    let errorMessage = fallbackError;

    if (data?.detail) {
        errorMessage = data.detail;
    } else if (data && typeof data === "object") {
        errorMessage = Object.values(data).flat().join(" ");
    }

    throw new Error(errorMessage);
}


    return await response.json();
}

export default postSignUp;