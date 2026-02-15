import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCampaignActions } from "../../hooks/useCampaignActions";
import Modal from "../UI/Modal";

export default function ChildCampaignCard({ campaign, childId, setChildren, onRequestDelete }) {
  const navigate = useNavigate();
  const { editCampaign } = useCampaignActions();

  const [editing, setEditing] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    title: campaign.title,
    goal: campaign.goal,
    description: campaign.description || "",
    image: campaign.image || "",
    has_deadline: campaign.has_deadline || false,
    deadline: campaign.deadline || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedCampaign = await editCampaign(campaign.id, form);

      setChildren((prev) =>
        prev.map((child) => ({
          ...child,
          campaigns: child.campaigns.map((c) =>
            c.id === campaign.id ? { ...c, ...updatedCampaign } : c
          ),
        }))
      );

      setSuccessMessage("Campaign updated successfully!");
      setEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update campaign:", err);
      alert(err.message || "Failed to update campaign");
    }
  };

  const handleToggleCampaignStatus = async (isOpenValue) => {
    try {
      const updatedCampaign = await editCampaign(campaign.id, {
        ...form,
        is_open: isOpenValue,
      });

      setChildren((prev) =>
        prev.map((child) => ({
          ...child,
          campaigns: child.campaigns.map((c) =>
            c.id === campaign.id ? { ...c, ...updatedCampaign } : c
          ),
        }))
      );

      setShowCloseModal(false);
      setEditing(false);
      setSuccessMessage(isOpenValue ? "Campaign reopened!" : "Campaign closed!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update campaign status:", err);
      alert(err.message || "Failed to update campaign status");
    }
  };

  const percentage =
    campaign.goal > 0 ? Math.min((campaign.total_raised / campaign.goal) * 100, 100) : 0;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`p-4 rounded-2xl border shadow-sm transition ${
          campaign.is_open
            ? "glass-panel border-sky-100"
            : "bg-gray-100 border-gray-300 opacity-80"
        }`}
      >
        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl mb-4">
            {successMessage}
          </div>
        )}

        {!editing ? (
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={campaign.image || "/dreamjar-banner.svg"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4
                    className="text-lg font-semibold cursor-pointer hover:text-indigo-500/70"
                    onClick={() => navigate(`/dreamjars/${campaign.id}`)}
                  >
                    {campaign.title}
                  </h4>

                  {!campaign.is_open && (
                    <span className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                      Closed
                    </span>
                  )}
                </div>

                <button
                  className="w-full max-w-24 py-3 rounded-xl cursor-pointer bg-blue-200 text-blue-600 hover:bg-blue-300 transition"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
                <motion.div
                  className="bg-pink-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background: "linear-gradient(90deg, #f472b6, #6366f1)",
                  }}
                />
              </div>

              <p className="text-gray-600 text-sm mt-1">
                ${campaign.total_raised || 0} / ${campaign.goal} raised
              </p>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleSave}>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Title"
            />
            <input
              type="number"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Goal"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Description"
            />
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Image URL"
            />
            <label className="flex items-center gap-2 text-md">
              <input
                type="checkbox"
                name="has_deadline"
                checked={form.has_deadline}
                onChange={handleChange}
              />
              Add Deadline
            </label>
            {form.has_deadline && (
              <input
                type="date"
                name="deadline"
                value={form.deadline?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              />
            )}

            <div className="flex flex-col gap-2 mt-2">
              <button
                type="submit"
                className="w-full py-2 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition"
              >
                Save Changes
              </button>

              {campaign.is_open ? (
                <button
                  type="button"
                  className="w-full py-2 cursor-pointer rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                  onClick={() => setShowCloseModal(true)}
                >
                  Close DreamJar
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
                  onClick={() => handleToggleCampaignStatus(true)}
                >
                  Reopen DreamJar
                </button>
              )}

              <button
                type="button"
                className="w-full py-2 cursor-pointer rounded-xl bg-red-200 text-red-600 hover:bg-red-300 transition"
                onClick={() =>
                  onRequestDelete({ campaignId: campaign.id, childId })
                }
              >
                Delete
              </button>

              <button
                type="button"
                className="w-full py-2 cursor-pointer rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>

      <Modal isOpen={showCloseModal} onClose={() => setShowCloseModal(false)}>
        <div className="flex flex-col gap-4 text-center">
          <p>Are you sure you want to close this campaign?</p>
          <button
            className="tab-variant"
            onClick={() => handleToggleCampaignStatus(false)}
          >
            Yes, Close Campaign
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-xl"
            onClick={() => setShowCloseModal(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
