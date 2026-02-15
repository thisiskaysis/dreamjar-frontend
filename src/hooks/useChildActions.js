import { useAuth } from "./use-auth";
import getUser from "../api/get-user";
import postChild from "../api/post-child";
import deleteChild from "../api/delete-child";
import putChild from "../api/put-child";

export function useChildActions() {
    const { auth } = useAuth();
    const token = auth?.access;

    const createChild = async (childId, data) => {
        if (!token) throw new Error("User not logged in");

        // Fetch the current parent using the token
        const parent = await getUser(token);
        if (!parent?.id) throw new Error("Parent not found");

        // Post the child using the parent ID
        return postChild(childId, data, token);
    };

    const removeChild = async (childId) => deleteChild(childId, token);
    const editChild = async (childId, data) => putChild(childId, data, token);

    return { createChild, removeChild, editChild };
}
