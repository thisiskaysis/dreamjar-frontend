import { useState } from "react";
import { useCampaignActions } from "../../hooks/useCampaignActions"; // Keep your original import

function CreateCampaignForm({ childId, onSuccess, closeCampaignModal }) {
  const { createCampaign } = useCampaignActions();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    category: "dreams",
    has_deadline: false,
    deadline: "",
  });

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
      ...formData,
      goal: Number(formData.goal),
      deadline: formData.has_deadline ? formData.deadline : null,
    };

    try {
      const newCampaign = await createCampaign(childId, payload);
      onSuccess(newCampaign);
    } catch (error) {
      setErrors(error);
    }
  };

  const renderFieldError = (field) => {
    if (!errors[field]) return null;
    if (Array.isArray(errors[field])) {
      return (
        <p className="text-red-500 text-sm mt-1">{errors[field].join(" ")}</p>
      );
    }
    return <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Create DreamJar</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="dream-label">
            TITLE
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="DreamJar Title"
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
            value={formData.description}
            onChange={handleChange}
            rows={4}
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
            value={formData.goal}
            onChange={handleChange}
            placeholder="Goal ($)"
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
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="dream-label">
            CATEGORY
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          >
            <option value="dreams">Dreams</option>
            <option value="education">Education</option>
            <option value="hobbies">Hobbies</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        {/* Deadline Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="has_deadline"
            checked={formData.has_deadline}
            onChange={handleChange}
          />
          <label className="text-gray-600">Add Deadline?</label>
        </div>

        {/* Deadline Input */}
        {formData.has_deadline && (
          <div className="relative">
            <label className="dream-label">DEADLINE</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            />
          </div>
        )}

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
            type="submit"
            className="w-full py-3 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition"
          >
            Create DreamJar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaignForm;
