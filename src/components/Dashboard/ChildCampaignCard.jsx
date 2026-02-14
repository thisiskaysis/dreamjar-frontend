import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

export default function ChildCampaignCard({ campaign, childId, setChildren }) {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

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

  const handleSave = () => {
    // TODO: Replace with real PUT request
    setChildren((prev) =>
      prev.map((child) => ({
        ...child,
        campaigns: child.campaigns.map((c) =>
          c.id === campaign.id ? { ...c, ...form } : c
        ),
      }))
    );

    setEditing(false);
  };

  const handleToggleCampaignStatus = (isOpenValue) => {
    // TODO: Replace with real PUT request

    setChildren((prev) =>
      prev.map((child) => ({
        ...child,
        campaigns: child.campaigns.map((c) =>
          c.id === campaign.id ? { ...c, is_open: isOpenValue } : c
        ),
      }))
    );

    setShowCloseModal(false);
    setEditing(false);
  };

  const percentage =
    campaign.goal > 0
      ? Math.min((campaign.total_raised / campaign.goal) * 100, 100)
      : 0;

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
        {!editing ? (
          /* ================= SMALL VIEW ================= */
          <div className="flex gap-4">
            {/* IMAGE */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {campaign.image ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  🎨
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4
                    className="text-lg font-semibold cursor-pointer"
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
                  className="text-blue-500 hover:underline text-sm"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
                <motion.div
                  className="bg-pink-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <p className="text-gray-600 text-sm mt-1">
                ${campaign.total_raised || 0} / ${campaign.goal} raised
              </p>
            </div>
          </div>
        ) : (
          
          /* ================= EDIT VIEW ================= */
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Title"
            />

            <input
              type="number"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Goal"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Description"
            />

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Image URL"
            />

            {/* DEADLINE TOGGLE */}
            <label className="flex items-center gap-2 text-sm">
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
                className="w-full p-2 rounded-md border border-gray-300"
              />
            )}

            {/* BUTTONS */}
            <div className="flex flex-col gap-2 mt-2">
              <button className="tab-variant w-full" onClick={handleSave}>
                Save Changes
              </button>

              {campaign.is_open ? (
                <button
                  className="w-full py-2 rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                  onClick={() => setShowCloseModal(true)}
                >
                  Close Campaign
                </button>
              ) : (
                <button
                  className="w-full py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
                  onClick={() => handleToggleCampaignStatus(true)}
                >
                  Reopen Campaign
                </button>
              )}

              <DeleteCampaign
                campaignId={campaign.id}
                childId={childId}
                setChildren={setChildren}
              />

              <button
                className="w-full py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* CLOSE CONFIRMATION MODAL */}
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
