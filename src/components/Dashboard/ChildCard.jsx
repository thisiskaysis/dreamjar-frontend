import ChildCampaignCard from "./ChildCampaignCard";
import EditChild from "./ChildActions/EditChild";
import DeleteChild from "./ChildActions/DeleteChild";
import getChildAvatar from "./ChildActions/getChildAvatar";

function ChildCard({ child, setChildren, onOpenCampaignModal }) {
  return (
    <div className="child-card">
      <div className="child-profile-pic">
        <img src={getChildAvatar(child)} alt={child?.name || "Child"} />
      </div>

      <h2>{child?.name || "Unnamed"}</h2>
      <p>Age: {child?.age || "?"}</p>

      <div className="child-actions">
        <button
          className="dj-button"
          onClick={() => onOpenCampaignModal(child.id)}
        >
          Create Campaign
        </button>
        <EditChild childId={child.id} setChildren={setChildren} />
        <DeleteChild childId={child.id} setChildren={setChildren} />
      </div>

      {child.campaigns?.length > 0 && (
        <div className="child-campaigns">
          {child.campaigns.map((c) => (
            <ChildCampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChildCard;
