import { useState } from "react";
import { useChildActions } from "../../hooks/useChildActions";
import "./Dashboard.css";

function Dashboard({ user }) {
  const { createChild } = useChildActions();
  const [children, setChildren] = useState(user.children || []);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleAddChild = async (e) => {
    e.preventDefault();
    if (!name || !dob) return;

    try {
      const newChild = await createChild(user.id, { name, date_of_birth: dob });
      setChildren([...children, newChild]);
      setName("");
      setDob("");
      setShowForm(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.first_name}</h1>

      {/* Add Child Button */}
      <button
        className="add-child-btn"
        onClick={() => setShowForm(true)}
      >
        Add Child
      </button>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add a Child</h2>
            <form onSubmit={handleAddChild} className="child-form">
              <input
                type="text"
                placeholder="Child's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input-field"
              />
              <div className="form-buttons">
                <button type="submit" className="submit-btn">Create</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Children List */}
      <div className="children-section">
        {children.length === 0 && <p>No children yet.</p>}

        {children.map((child) => (
          <div key={child.id} className="child-card">
            <h2>{child.name}</h2>
            <p>Age: {child.age}</p>

            <div className="child-actions">
              <button>Create Campaign</button>
              <button>Edit Child</button>
              <button>Delete Child</button>
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
