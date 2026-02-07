import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate} from "react-router-dom";

import postSignUp from "../../api/post-signup"
import GoogleLogin from "../GoogleLogin.jsx";

export function SignUpForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    first_name:"",
    last_name:"",
    username:"",
    email:"",
    password:"",
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
    .catch ((error) => {
          setErrors(error);
      });
  };

  const handleLogIn = () => {
    console.log("User exists Log In")
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Main container */}
      <div className="flex items-center gap-8 max-w-5xl w-full px-8">
        {/* Form section */}
        <div className="flex-1 relative">

          {/* Form */}
          <form className="space-y-6">
            {/* Title */}
            <motion.h1
              className="text-xl font-bold text-[#8B7BA8] text-center mb-8 mt-10 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sign Up
            </motion.h1>

            <div className="relative">
              <label
                htmlFor="first_name"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
              >
                FIRST NAME
              </label>
              <input
                id="first_name"
                type="text"
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="First Name"
                required
                onChange={handleChange}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1 ml-10">{errors.first_name.join(" ")}</p>
                )}
            </div>

            <div className="relative">
              <label
                htmlFor="last_name"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
              >
                LAST NAME
              </label>
              <input
                id="last_name"
                type="text"
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="Last Name"
                required
                onChange={handleChange}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1 ml-10">{errors.last_name.join(" ")}</p>
                )}
            </div>

            <div className="relative">
              <label
                htmlFor="username"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
              >
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="Username"
                required
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 ml-10">{errors.username.join(" ")}</p>
                )}
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="text"
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="Email"
                required
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 ml-10">{errors.email.join(" ")}</p>
                )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="Password"
                required
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-10">{errors.password.join(" ")}</p>
                )}



              {/* Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#8B7BA8] hover:text-[#fbcdd7] transition-colors"
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
              <p className="text-red-500 text-sm mb-4 text-center">{errors.non_field_errors.join(" ")}
              </p>
            )}


            {/* Submit Button */}
            <motion.button
              type="button"
              className="w-full h-14 rounded-full bg-[#a0d4f1] border-4 border-[#8B7BA8] text-[#8B7BA8] text-xl font-bold hover:bg-[#ffe7a1] hover:scale-105 disabled:bg-[#f9dde3] disabled:scale-100 disabled:opacity-50 transition-all duration-300"
              style={{
                boxShadow: "4px 4px 0 #8B7BA8",
              }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={handleSubmit}
            >
              Sign Up
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-1 bg-[#8B7BA8] rounded-full opacity-20" />
              <span
                className="text-sm font-bold text-[#8B7BA8]"
              >
                OR
              </span>
              <div className="flex-1 h-1 bg-[#8B7BA8] rounded-full opacity-20" />
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
