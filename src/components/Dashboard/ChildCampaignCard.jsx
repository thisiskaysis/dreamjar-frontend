import { useState } from "react";
import { motion } from "framer-motion";
import DeleteCampaign from "../Campaigns/CampaignActions/DeleteCampaign";

export default function ChildCampaignCard({ campaign, childId, setChildren }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: campaign.title,
    goal: campaign.goal,
  });

  const percentage = Math.min(Math.round((campaign.amount_raised / campaign.goal) * 100), 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would call your editCampaign API
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

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-panel p-4 rounded-2xl border border-sky-100 shadow-sm"
    >
      {!editing ? (
        <>
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-semibold cursor-pointer">{campaign.title}</h4>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:underline text-sm"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <DeleteCampaign campaignId={campaign.id} childId={childId} setChildren={setChildren} />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
            <motion.div
              className="bg-pink-400 h-3 rounded-full"
              style={{ width: `${percentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-gray-600 text-sm mt-1">
            ${campaign.amount_raised} / ${campaign.goal} raised
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
          />
          <input
            type="number"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300"
          />
          <div className="flex gap-2">
            <button className="tab-variant flex-1" onClick={handleSave}>
              Save
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
