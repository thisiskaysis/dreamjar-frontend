import { useState } from "react";
import { useCampaignActions } from "../../hooks/useCampaignActions"; // Keep your original import

function CreateCampaignForm({ childId, setCampaigns, closeModal }) {
  const { createCampaign } = useCampaignActions(); // Keep your original hook
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    goal: "",
    image_url: "",
    category: "Dreams",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrors({});
    try {
      const newCampaign = await createCampaign(childId, credentials);
      setCampaigns((prev) => [...prev, newCampaign]);
      setCredentials({
        title: "",
        description: "",
        goal: "",
        image_url: "",
        category: "Dreams",
      });
      closeModal();
    } catch (errorData) {
      setErrors(errorData);
    }
  };

  const renderFieldError = (field) => {
    if (!errors[field]) return null;
    if (Array.isArray(errors[field])) {
      return <p className="text-red-500 text-sm mt-1">{errors[field].join(" ")}</p>;
    }
    return <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">
        Create Campaign
      </h3>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="dream-label">
            TITLE
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={credentials.title}
            onChange={handleChange}
            placeholder="Campaign Title"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          />
          {renderFieldError("title")}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="dream-label">
            DESCRIPTION
          </label>
          <textarea
            id="description"
            name="description"
            value={credentials.description}
            onChange={handleChange}
            placeholder="Campaign Description"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600 min-h-[100px]"
            required
          />
          {renderFieldError("description")}
        </div>

        {/* Goal */}
        <div>
          <label htmlFor="goal" className="dream-label">
            GOAL ($)
          </label>
          <input
            id="goal"
            name="goal"
            type="number"
            value={credentials.goal}
            onChange={handleChange}
            placeholder="Goal Amount"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          />
          {renderFieldError("goal")}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image_url" className="dream-label">
            IMAGE URL (OPTIONAL)
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            value={credentials.image_url}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
          />
          {renderFieldError("image_url")}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="dream-label">
            CATEGORY
          </label>
          <select
            id="category"
            name="category"
            value={credentials.category}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          >
            <option value="Dreams">Dreams</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Arts">Arts</option>
            <option value="Other">Other</option>
          </select>
          {renderFieldError("category")}
        </div>

        {/* Non-field errors */}
        {errors.non_field_errors && (
          <p className="text-red-500 text-sm text-center">
            {Array.isArray(errors.non_field_errors)
              ? errors.non_field_errors.join(" ")
              : errors.non_field_errors}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            className="w-full py-3 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition"
            onClick={handleSubmit}
          >
            Create Campaign
          </button>

          <button
            type="button"
            className="w-full py-3 cursor-pointer rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaignForm;