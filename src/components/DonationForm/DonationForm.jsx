import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDonationActions } from "../../hooks/useDonationActions";
import { useAuth } from "../../hooks/use-auth";

export default function DonationForm({ campaignId, onSuccess }) {
  const { auth } = useAuth();
  const user = auth?.user;
  const { createDonation } = useDonationActions();

  const [formData, setFormData] = useState({
    amount: "",
    comment: "",
    donor_name: "",
    donor_email: "",
    anonymous: false,
  });

  const [errors, setErrors] = useState({});

  // Autofill for logged-in user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        donor_name: user.first_name || user.username || "",
        donor_email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      amount: Number(formData.amount),
      comment: formData.comment,
      anonymous: formData.anonymous,
    };

    // Only send name/email if user is not anonymous
    if (!formData.anonymous) {
      payload.donor_name = formData.donor_name;
      payload.donor_email = formData.donor_email;
    }

    try {
      const response = await createDonation(campaignId, payload);
      onSuccess?.(response);

      // Reset form
      setFormData({
        amount: "",
        comment: "",
        donor_name: user ? user.first_name || user.username : "",
        donor_email: user ? user.email : "",
        anonymous: false,
      });
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Something went wrong"] });
    }
  };

  // Show name/email fields only if anonymous is unchecked
  const showAnonFields = !formData.anonymous;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h2 className="text-3xl font-bold text-[#8B7BA8] text-center mb-4">
        Make a Donation
      </h2>

      {/* Amount */}
      <div className="relative">
        <label className="form-label">AMOUNT ($)</label>
        <input
          type="number"
          min="1"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="dream-input"
        />
        {errors.amount && <p className="error">{errors.amount.join(", ")}</p>}
      </div>

      {/* Anonymous toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="anonymous"
          checked={formData.anonymous}
          onChange={handleChange}
        />
        <label className="text-[#8B7BA8] font-bold">
          Donate anonymously
        </label>
      </div>

      {/* Name/Email for non-anonymous donations */}
      {showAnonFields && (
        <>
          <div className="relative">
            <label className="form-label">NAME</label>
            <input
              type="text"
              name="donor_name"
              value={formData.donor_name}
              onChange={handleChange}
              className="dream-input"
              required={!user}
            />
            {errors.donor_name && <p className="error">{errors.donor_name.join(", ")}</p>}
          </div>

          <div className="relative">
            <label className="form-label">EMAIL</label>
            <input
              type="email"
              name="donor_email"
              value={formData.donor_email}
              onChange={handleChange}
              className="dream-input"
              required={!user}
            />
            {errors.donor_email && <p className="error">{errors.donor_email.join(", ")}</p>}
          </div>
        </>
      )}

      {/* Comment */}
      <div className="relative">
        <label className="form-label">COMMENT</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={4}
          className="dream-textarea"
        />
        {errors.comment && <p className="error">{errors.comment.join(", ")}</p>}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        className="dj-button"
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        Donate
      </motion.button>

      {errors.non_field_errors && (
        <p className="error text-center">
          {errors.non_field_errors.join(", ")}
        </p>
      )}
    </form>
  );
}
