import { useAuth } from "./use-auth";
import putUser from "../api/put-user";
import deleteUser from "../api/delete-user";

export function useUserActions() {
    const { auth } = useAuth();
    const token = auth?.access;

    const editUser = async (userId, data) => putUser(userId, data, token);
    const removeUser = async(userId) => deleteUser(userId, token);

    return { editUser, removeUser };
}