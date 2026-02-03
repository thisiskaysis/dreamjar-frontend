import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import getUser from "../api/get-user";

export default function useUser() {
    const { auth } = useAuth();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [userId = window.localStorage.getItem("userId"), setUserId] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(auth.userId, auth.token);
                setUser(user)
                setIsLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (auth.userId && auth.access) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    }, [auth.userId, auth.access]);

    return { user, isLoading, error };
}