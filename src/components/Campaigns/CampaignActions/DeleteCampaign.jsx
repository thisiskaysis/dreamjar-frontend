import { useCampaignActions } from "../../../hooks/useCampaignActions";

function DeleteCampaign({ campaignId, setCampaigns }) {
    const { removeCampaign } = useCampaignActions();

    const handleRemoveCampaign = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this campaign?");
        if (!confirmDelete) return;

        try {
            await removeCampaign(campaignId);

            // Update UI
            setCampaigns((prev) =>
            prev.filter((campaign) => campaign.id !== campaignId)
        );

        alert("Campaign deleted successfully");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <button onClick={handleRemoveCampaign}>Delete Campaign</button>
    );
}

export default DeleteCampaign;