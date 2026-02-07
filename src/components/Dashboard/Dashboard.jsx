import "./Dashboard.css";
import CreateChild from "./ChildActions/CreateChild";
import ChildCard from "./ChildCard";

function Dashboard({ user }) {

  return (
  <div className="dashboard">
    <h1>Welcome, {user.first_name}</h1>

    <CreateChild user={user} setChildren={setChildren} />
    <ChildCard />

  </div>
);
}

export default Dashboard;