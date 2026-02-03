import { useAuth } from "./use-auth";
import postChild from "../api/post-child";
import deleteChild from "../api/delete-child";

export function useChildActions() {
    const { auth } = useAuth();
    const token = auth?.access;

    const createChild = async (parentId, data) => postChild(parentId, data, token);
    const removeChild = async (childId) => deleteChild(childId, token);

    return { createChild, removeChild };
}