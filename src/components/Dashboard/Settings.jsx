import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUserActions } from "../../hooks/useUserActions";

export default function SettingsTab({ user, onSuccess }) {
  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const { editUser } = useUserActions();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const newUserDetails = await editUser(user.id, formData);
      onSuccess(newUserDetails);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-panel w-full max-w-2xl rounded-3xl shadow-xl p-8 border border-sky-100"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="font-bold">Settings</h2>
          <p className="text-gray-500 mt-1">
            Manage your account preferences and privacy.
          </p>
        </div>

        {/* Account Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="dream-label">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="dream-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            />
          </div>

          {/* Username */}
          <div>
            <label className="dream-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="dream-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            />
          </div>

          {/* Change Password */}
          <div>
            <button className="tab-variant w-full flex justify-center">
              Save Changes
            </button>
          </div>

          {/* Divider */}
          <div className="border-t pt-6"></div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-700">
                Email Notifications
              </h4>
              <p className="text-sm text-gray-400">
                Get updates when donations are received.
              </p>
            </div>

            <button
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

            <button className="w-full bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition">
              Delete Account
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
