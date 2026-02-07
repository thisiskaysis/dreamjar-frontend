import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.h2
        className="text-center text-2xl font-bold text-[#8B7BA8] mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Add a Child
      </motion.h2>

      <form className="space-y-4">
        {/* Name */}
        <div className="relative">
          <label
            htmlFor="name"
            className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Child's Name"
            className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] transition-all duration-300"
            required
          />
          {renderFieldError("name")}
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label
            htmlFor="date_of_birth"
            className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
          >
            Date of Birth
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={credentials.date_of_birth}
            onChange={handleChange}
            className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] transition-all duration-300"
            required
          />
          {renderFieldError("date_of_birth")}
        </div>

        {/* Gender */}
        <div className="relative">
          <label
            htmlFor="gender"
            className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={credentials.gender}
            onChange={handleChange}
            className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] transition-all duration-300"
            required
          >
            <option value="" disabled>
              Select gender
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
        <motion.button
          type="button"
          className="w-full h-14 rounded-full bg-[#a0d4f1] border-4 border-[#8B7BA8] text-[#8B7BA8] text-xl font-bold hover:bg-[#ffe7a1] hover:scale-105 transition-all duration-300"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={handleSubmit}
        >
          Create Child
        </motion.button>
      </form>
    </div>
  );
}

export default CreateChild;
