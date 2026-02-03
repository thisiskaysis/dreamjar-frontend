import useUser from "../../hooks/use-user";
import "./Dashboard.css"

function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {user.first_name}</h1>

      <div className="children-section">
        {user.children?.length === 0 && <p>No children yet.</p>}

        {user.children?.map((child) => (
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
