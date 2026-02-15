import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useChildActions } from "../../../hooks/useChildActions";

export default function EditChild({
  childId,
  childData,
  setChildren,
  setSuccessMessageParent,
  onRequestDelete,
}) {
  const { editChild } = useChildActions();
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: childData?.name || "",
    profile_picture: childData?.profile_picture || "",
  });

  useEffect(() => {
    if (childData) {
      setForm({
        name: childData.name || "",
        profile_picture: childData.profile_picture || "",
      });
    }
  }, [childData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        profile_picture: form.profile_picture || null,
      };

      // Call API
      const updatedChild = await editChild(childId, payload);

      // Update local state
      setChildren((prev) =>
        prev.map((c) => (c.id === childId ? { ...c, ...updatedChild } : c)),
      );

      // Show success message at top of ChildCard
      setSuccessMessageParent?.("Child updated successfully!");

      setEditing(false);

      // Clear success message after 3s
      setTimeout(() => setSuccessMessageParent?.(""), 3000);
    } catch (err) {
      console.error("Failed to update child:", err);
      alert(err.message || "Failed to update child");
    }
  };

  return (
    <div className="w-full md:w-auto">
      {!editing ? (
        <button
          className="w-full min-w-24 py-3 rounded-xl cursor-pointer bg-blue-200 text-blue-600 hover:bg-blue-300 transition"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      ) : (
        <motion.form
          className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl shadow-md border border-gray-200"
          onSubmit={handleSave}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
            <label className="dream-label">NAME</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Child Name"
            />
          </div>

          <div className="relative">
            <label className="dream-label">IMAGE URL</label>
            <input
              type="url"
              name="profile_picture"
              value={form.profile_picture}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              placeholder="Image URL"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button
              type="submit"
              className="w-full py-2 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="w-full py-2 cursor-pointer rounded-xl bg-red-200 text-red-600 hover:bg-red-300 transition"
              onClick={() =>
                onRequestDelete({ id: childId, name: childData.name })
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
        </motion.form>
      )}
    </div>
  );
}
