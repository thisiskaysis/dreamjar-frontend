import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postSignUp from "../../api/post-signup";
import GoogleLogin from "../GoogleLogin.jsx";

export function SignUpForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({}); // clear previous errors

    postSignUp(credentials)
      .then((response) => {
        window.localStorage.setItem("access", response.access);
        navigate("/");
      })
      .catch((error) => {
        setErrors(error);
      });
  };

  const renderFieldError = (field) => {
    if (!errors[field]) return null;
    if (Array.isArray(errors[field])) {
      return <p className="text-red-500 text-sm mt-1">{errors[field].join(" ")}</p>;
    }
    return <p className="text-red-500 text-sm mt-1">{errors[field]}</p>;
  };

  return (
    <div className="flex items-center justify-center relative overflow-hidden">
      {/* Main container */}
      <div className="flex items-center gap-8 w-full px-8">
        {/* Form section */}
        <div className="flex-1 relative">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-700 text-center mb-6 mt-10">
              Sign Up
            </h1>

            <div>
              <label htmlFor="first_name" className="dream-label">
                FIRST NAME
              </label>
              <input
                id="first_name"
                type="text"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
                placeholder="First Name"
                required
                onChange={handleChange}
              />
              {renderFieldError("first_name")}
            </div>

            <div>
              <label htmlFor="last_name" className="dream-label">
                LAST NAME
              </label>
              <input
                id="last_name"
                type="text"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
                placeholder="Last Name"
                required
                onChange={handleChange}
              />
              {renderFieldError("last_name")}
            </div>

            <div>
              <label htmlFor="username" className="dream-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
                placeholder="Username"
                required
                onChange={handleChange}
              />
              {renderFieldError("username")}
            </div>

            <div>
              <label htmlFor="email" className="dream-label">
                EMAIL
              </label>
              <input
                id="email"
                type="text"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600"
                placeholder="Email"
                required
                onChange={handleChange}
              />
              {renderFieldError("email")}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="dream-label">
                PASSWORD
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-600 pr-12"
                placeholder="Password"
                required
                onChange={handleChange}
              />
              {renderFieldError("password")}

              {/* Toggle Password Visibility Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isDisabled}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            {errors.non_field_errors && (
              <p className="text-red-500 text-sm text-center">
                {Array.isArray(errors.non_field_errors)
                  ? errors.non_field_errors.join(" ")
                  : errors.non_field_errors}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 cursor-pointer rounded-xl bg-indigo-200 text-indigo-700 hover:bg-indigo-300 transition mt-4"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-sm font-bold text-gray-500">OR</span>
              <div className="flex-1 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Google Login Button */}
            <GoogleLogin />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;