import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserActions } from "../../hooks/useUserActions";

export default function SettingsTab({ user, onUserUpdate }) {
  const { editUser, removeUser } = useUserActions();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (user && !initialized.current) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        email: user.email || "",
      });
      initialized.current = true;
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const updatedUser = await editUser(user.id, formData);
      onUserUpdate?.(updatedUser);
          setSuccessMessage("Details updated successfully");
    } catch (err) {
      setErrors(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await removeUser(user.id);
      setAuth({ access: null, user: null });
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center px-4 py-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel w-full max-w-2xl rounded-3xl shadow-xl p-8 border border-sky-100"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bold">Settings</h2>
          {successMessage && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded-xl mb-4">
              {successMessage}
            </div>
          )}
          <p className="text-gray-500 mt-1">Manage your account preferences and privacy.</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {["first_name", "last_name", "username", "email"].map((field) => (
            <div key={field}>
              <label className="dream-label">{field.replace("_", " ").toUpperCase()}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              />
            </div>
          ))}

          <button type="submit" className="tab-variant w-full flex justify-center">
            Save Changes
          </button>

          {/* Divider */}
          <div className="border-t pt-6"></div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-700">Email Notifications</h4>
              <p className="text-sm text-gray-400">Get updates when donations are received.</p>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
                notifications ? "bg-sky-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                  notifications ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-700">Private Profile</h4>
              <p className="text-sm text-gray-400">
                Hide your children’s campaigns from public browsing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPrivateProfile(!privateProfile)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition ${
                privateProfile ? "bg-sky-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                  privateProfile ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t pt-6"></div>

          {/* Danger Zone */}
          <div>
            <h4 className="text-red-500 font-semibold mb-3">Danger Zone</h4>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
              Delete Account
            </button>
          </div>
        </form>
      </motion.div>

      {/* Animated Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-xl font-bold mb-4 text-red-600">Confirm Delete</h3>
              <p className="mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
