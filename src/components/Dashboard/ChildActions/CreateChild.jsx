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
  setErrors({}); // clear previous errors
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
      return <p className="text-red-500 text-sm mt-1 ml-2">{errors[field].join(" ")}</p>;
    }
    return <p className="text-red-500 text-sm mt-1 ml-2">{errors[field]}</p>;
  };

  return (
    <div className="child-form-modal">
      <h1 className="text-lg font-bold text-center text-[#8B7BA8] mb-3">
        Add a Child
      </h1>

      <form className="space-y-4">
        {/* Name */}
        <div className="relative">
          <label
            htmlFor="name"
            className="form-label"
          >
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Child's Name"
            className="dream-input"
            required
          />
          {renderFieldError("name")}
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label
            htmlFor="date_of_birth"
            className="form-label"
          >
            DATE OF BIRTH
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={credentials.date_of_birth}
            onChange={handleChange}
            className="dream-input"
            required
          />
          {renderFieldError("date_of_birth")}
        </div>

        {/* Gender */}
        <div className="relative">
          <label
            htmlFor="gender"
            className="form-label"
          >
            GENDER
          </label>
          <select
            id="gender"
            name="gender"
            value={credentials.gender}
            onChange={handleChange}
            className="dream-input"
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
          <p className="text-red-500 text-sm mb-4 text-center">
            {Array.isArray(errors.non_field_errors)
              ? errors.non_field_errors.join(" ")
              : errors.non_field_errors}
          </p>
        )}

        {/* Submit */}
        <button
          type="button"
          className="dj-button w-full"
          onClick={handleSubmit}
        >
          Create Child
        </button>
      </form>
    </div>
  );
}

export default CreateChild;
