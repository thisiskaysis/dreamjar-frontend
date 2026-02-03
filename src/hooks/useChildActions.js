import { useAuth } from "./use-auth";
import postChild from "../api/post-child";

export function useChildActions() {
    const { auth } = useAuth();
    const token = auth?.access;

    const createChild = async (parentId, data) => postChild(parentId, data, token);

    return { createChild };
}