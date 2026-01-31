async function postLogin(email, password) {
    const url = `${import.meta.env.VITE_API_URL}/api/token/`;

    const google_url = `${import.meta.env.VITE_API_URL}/auth/google/login/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to login`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postLogin;