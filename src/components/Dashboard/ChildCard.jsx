import ChildCampaignCard from "./ChildCampaignCard";
import EditChild from "./ChildActions/EditChild";
import DeleteChild from "./ChildActions/DeleteChild";
import getChildAvatar from "./ChildActions/getChildAvatar";

function ChildCard({ child, setChildren, onOpenCampaignModal }) {
  return (
    <div
      className="child-card glass-panel flex flex-col items-center text-center w-full"
    >
      {/* Avatar */}
      <div className="avatar">
        <img
          src={getChildAvatar(child)}
          alt={child?.name || "Child"}
        />
      </div>

      <h2 className="font-semibold text-lg">{child?.name || "Unnamed"}</h2>
      <p className="text-gray-500 text-lg mb-3">Age: {child?.age || "?"}</p>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center mb-3">
        <button
          className="dj-button"
          onClick={() => onOpenCampaignModal(child.id)}
        >
          Create Campaign
        </button>
        <EditChild childId={child.id} setChildren={setChildren} />
        <DeleteChild childId={child.id} setChildren={setChildren} />
      </div>

      {/* Campaigns */}
      <h3 className="font-semibold text-2xl text-gray-600 w-full mt-5 mb-2">
        {child.name}'s Campaigns</h3>

      {child.campaigns?.length > 0 && (
        <div className="flex flex-col gap-2 w-full mt-2">
          {child.campaigns.map((c) => (
            <ChildCampaignCard
              key={c.id}
              campaign={c}
              childId={child.id}
              setChildren={setChildren}
            />
          ))}
        </div>
      )}

      {child.campaigns?.length === 0 && (
        <p className="text-gray-500 italic">
          No campaigns yet.</p>
      )}
    </div>
  );
}

export default ChildCard;
