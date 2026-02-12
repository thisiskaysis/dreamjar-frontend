import { useState } from "react";
import { motion } from "framer-motion";
import { useCampaignActions } from "../../hooks/useCampaignActions";
import "./CreateCampaign.css"

function CreateCampaignForm({ childId, onSuccess }) {
const { createCampaign } = useCampaignActions();

const [errors, setErrors] = useState({});
const [formData, setFormData] = useState ({
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

return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <h2 className="text-3xl font-bold text-[#8B7BA8] text-center mb-4">
        Create Campaign
      </h2>

      {/* Title */}
      <div className="relative">
        <label className="form-label">TITLE</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="dream-input"
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="relative">
        <label className="form-label">DESCRIPTION</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="dream-textarea"
        />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>

      {/* Goal */}
      <div className="relative">
        <label className="form-label">GOAL ($)</label>
        <input
          name="goal"
          type="number"
          min="1"
          value={formData.goal}
          onChange={handleChange}
          required
          className="dream-input"
        />
        {errors.goal && <p className="error">{errors.goal}</p>}
      </div>

      {/* Image */}
      <div className="relative">
        <label className="form-label">IMAGE URL (OPTIONAL)</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="dream-input"
        />
      </div>

      {/* Category */}
      <div className="relative">
        <label className="form-label">CATEGORY</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="dream-input"
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
        <label className="text-[#8B7BA8] font-bold">
          Add Deadline?
        </label>
      </div>

      {/* Deadline Input */}
      {formData.has_deadline && (
        <div className="relative">
          <label className="form-label">DEADLINE</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="dream-input"
          />
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="dj-button w-full"
      >
        Create Campaign
      </button>

      {errors.non_field_errors && (
        <p className="error text-center">
          {errors.non_field_errors}
        </p>
      )}
    </form>
  );
}

export default CreateCampaignForm;