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
        let data = null;

        try {
            data = await response.json();
        } catch {
            throw { non_field_errors: [fallbackError] };
        }

        let errors = { non_field_errors: [fallbackError] };

        if (data?.detail) {
            errors.non_field_errors = [data.detail];
        } else if (data && typeof data === "object") {
            errors = {};
            Object.entries(data).forEach(([key,value]) => {
                errors[key] = Array.isArray(value) ? value : [value];
            });
        }

        throw errors;
    }

    return await response.json();
}

export default postLogin;