import { useState, useEffect } from "react";

import getUser from "../api/get-user";

export default function useAccount(token) {
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(token);
                setAccount(userData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return { account, isLoading, error };
}