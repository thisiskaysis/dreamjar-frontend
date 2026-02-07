import { useState } from "react";
import "./Dashboard.css";
import CreateChild from "./ChildActions/CreateChild";
import ChildCard from "./ChildCard";

function Dashboard({ user }) {
  const [children, setChildren] = useState(user.children || []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, {user.first_name}!</h1>
        <p>Manage your children and campaigns below.</p>
      </header>

      {/* Create Child Section */}
      <section className="create-child-section">
        <h2>Create a new child</h2>
        <div className="create-child-wrapper">
          <CreateChild user={user} setChildren={setChildren} />
        </div>
      </section>

      {/* Children Section */}
      <section className="children-section">
        <h2>Your Children</h2>
        {children.length === 0 && <p>No children yet. Start by creating one!</p>}

        <div className="children-grid">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              setChildren={setChildren}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
