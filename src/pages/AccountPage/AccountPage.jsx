import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAccount from "../../hooks/use-user";
import "./AccountPage.css"

function AccountPage() {

    const { account, isLoading, error } = useAccount();

    if (isLoading) {
        return (<p>Loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
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