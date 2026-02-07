import { useCampaignActions } from "../../../hooks/useCampaignActions";

function DeleteCampaign({ campaignId, setChildren }) {
  const { removeCampaign } = useCampaignActions();

  const handleRemoveCampaign = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this campaign?",
    );
    if (!confirmDelete) return;

    try {
      await removeCampaign(campaignId);

      // Update UI
      setChildren((prevChildren) =>
        prevChildren.map((child) =>
          child.campaigns
            ? {
                ...child,
                campaigns: child.campaigns.filter((c) => c.id !== campaignId),
              }
            : child,
        ),
      );

      alert("Campaign deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button className="dj-button" onClick={handleRemoveCampaign}>
      Delete Campaign
    </button>
  );
}

export default DeleteCampaign;
