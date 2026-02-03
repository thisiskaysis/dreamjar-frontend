import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";
import useUser from "../../hooks/use-user";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css"

function AccountPage() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const userId = auth?.user?.id;
    const { user, isLoading, error } = useUser();


    if (!userId) {
        return (
            <div>
                <p>You must be logged in to view Account Details.</p>
                <button onClick={() => navigate("/")}>Return Home</button>
            </div>
        );
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message || "Oops! An error occurred. Please try again later."}</p>
    }



    return <div className="account-page">
        <div className="account-header">
            <h1>Welcome, {account.first_name}</h1>
        </div>
        <div className="account-bar">
            <h3>{account.email}</h3>
            <h3>Account settings</h3>
        </div>
    </div>
}

export default AccountPage;