import { useState, useEffect } from "react";
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

  // Autofill for logged-in user?
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

  const renderFieldError = (field) => {
    if (!errors[field]) return null;
    if (Array.isArray(errors[field])) {
      return <p className="text-red-500 text-sm mt-1">{errors[field].join(", ")}</p>;
    }
    return <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Make a Donation
      </h2>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="dream-label">
          AMOUNT ($)
        </label>
        <input
          type="number"
          min="1"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
        />
        {renderFieldError("amount")}
      </div>

      {/* Anonymous toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="anonymous"
          checked={formData.anonymous}
          onChange={handleChange}
          className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="text-gray-700 font-semibold">
          Donate anonymously
        </label>
      </div>

      {/* Name/Email for non-anonymous donations */}
      {showAnonFields && (
        <>
          <div>
            <label className="dream-label">NAME</label>
            <input
              type="text"
              name="donor_name"
              value={formData.donor_name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              required={!user}
            />
            {renderFieldError("donor_name")}
          </div>

          <div>
            <label className="dream-label">EMAIL</label>
            <input
              type="email"
              name="donor_email"
              value={formData.donor_email}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
              required={!user}
            />
            {renderFieldError("donor_email")}
          </div>
        </>
      )}

      {/* Comment */}
      <div>
        <label className="dream-label">COMMENT</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={4}
          className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[100px]"
        />
        {renderFieldError("comment")}
      </div>

      {/* Non-field errors */}
      {errors.non_field_errors && (
        <p className="text-red-500 text-sm text-center">
          {Array.isArray(errors.non_field_errors)
            ? errors.non_field_errors.join(", ")
            : errors.non_field_errors}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition mt-4"
      >
        Donate
      </button>
    </form>
  );
}