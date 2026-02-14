import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Navigate } from "react-router-dom";
import useUser from "../../hooks/use-user";
import Dashboard from "../../components/Dashboard/Dashboard";

function AccountPage() {
  const { auth } = useAuth();
  const { user, isLoading, error } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  // Redirect if not logged in
  if (!auth?.access) return <Navigate to="/login" />;

  // Show loading state while fetching user
  if (isLoading || !currentUser) return <p className="text-center mt-20 text-xl text-[#8B7BA8]">Loading your account...</p>;

  // Show error if fetch fails
  if (error) return <p className="text-center mt-20 text-xl text-red-500">{error.message}</p>;

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    setAuth((prev) => ({ ...prev, user: updatedUser }));
  };

  // Render Dashboard with user data
  return <Dashboard user={currentUser} setUser={handleUserUpdate} />;
}

export default AccountPage;
