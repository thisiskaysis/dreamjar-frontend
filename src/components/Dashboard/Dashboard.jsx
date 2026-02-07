import { useState } from "react";
import "./Dashboard.css";
import CreateChild from "./ChildActions/CreateChild";
import ChildCard from "./ChildCard";

function Dashboard({ user }) {
  const [children, setChildren] = useState(user.children || []);

  return (
  <div className="dashboard">
    <h1>Welcome, {user.first_name}</h1>

    <CreateChild 
    user={user} 
    setChildren={setChildren} 
    />
    <ChildCard 
    children={children}
    setChildren={setChildren}
    />    

  </div>
);
}

export default Dashboard;