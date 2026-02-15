import { useState } from "react";
import { useChildActions } from "../../../hooks/useChildActions";

function CreateChild({ user, setChildren, closeModal }) {
  const { createChild } = useChildActions();
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    name: "",
    date_of_birth: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrors({});
      console.log("Submitting child for parent", user.id, "with data:", credentials);

    try {
      const newChild = await createChild(user.id, credentials);
      setChildren((prev) => [...prev, newChild]);
      setCredentials({
        name: "",
        date_of_birth: "",
        gender: "",
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
        Add a Child
      </h3>

      <form className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="dream-label">
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Child's Name"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          />
          {renderFieldError("name")}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="date_of_birth" className="dream-label">
            DATE OF BIRTH
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={credentials.date_of_birth}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          />
          {renderFieldError("date_of_birth")}
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="dream-label">
            GENDER
          </label>
          <select
            id="gender"
            name="gender"
            value={credentials.gender}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Boy</option>
            <option value="female">Girl</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
          {renderFieldError("gender")}
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
            Create Child
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

export default CreateChild;