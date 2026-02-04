import { useState } from "react";
import { useChildActions } from "../../../hooks/useChildActions";

function CreateChild({ user, setChildren }) {
    const { createChild } = useChildActions();
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");

    const handleAddChild = async (e) => {
        e.preventDefault();
        if (!name || !dob) return;

        try {
            const newChild = await createChild(user.id, { name, date_of_birth: dob });
            setChildren((prev) => [...prev, newChild]);
            setName("");
            setDob("");
            setShowForm(false);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
        {/* Add Child Button */}
      <button className="add-child-btn" onClick={() => setShowForm(true)}
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
    </div>
    );
}

export default CreateChild;