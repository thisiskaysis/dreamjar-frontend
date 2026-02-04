import { useState } from "react";
import { useChildActions } from "../../hooks/useChildActions";
import "./Dashboard.css";
import CreateChild from "../ChildActions/CreateChild";
import DeleteChild from "../ChildActions/DeleteChild";

function Dashboard({ user }) {
  const { createChild, removeChild, editChild } = useChildActions();
  const [children, setChildren] = useState(user.children || []);

  {/* Edit child */}
  const handleEditChild = async (childId) => {
    const childToEdit = children.find((child) => child.id === childId);

    const newName = prompt("Edit child's name", childToEdit.name);
    const newDob = prompt(
      "Edit child's date of birth (YYYY-MM-DD):",
      childToEdit.date_of_birth
    );

    if (!newName || !newDob) return;

    try {
      const updateChild = await editChild(childId, {
        name: newName,
        date_of_birth: newDob,
      });

      setChildren((prevChildren) =>
      prevChildren.map((child) =>
      child.id === childId ? updateChild : child));

      alert("Child updated successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.first_name}</h1>

      <CreateChild user={user} setChildren={setChildren} />

      {/* Children List */}
      <div className="children-section">
        {children.length === 0 && <p>No children yet.</p>}

        {children.map((child) => (
          <div key={child.id} className="child-card">
            <h2>{child.name}</h2>
            <p>Age: {child.age}</p>

            <div className="child-actions">
              <button>Create Campaign</button>
              <button onClick={() => handleEditChild(child.id)}>Edit Child</button>
              <DeleteChild childId={child.id} setChildren={setChildren}/>
            </div>

            <div className="campaign-list">
              {child.campaigns?.map((campaign) => (
                <div key={campaign.id} className="campaign-item">
                  <h4>{campaign.title}</h4>
                  <p>${campaign.amount_raised} / ${campaign.goal}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
