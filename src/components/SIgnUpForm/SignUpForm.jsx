import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginJar } from "../LoginForm/LoginJar.jsx";
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#c9b3e0] via-[#fbcdd7] to-[#ffe7a1] relative overflow-hidden">
      {/* Background floating stars */}
      <motion.div
        className="absolute top-[10%] left-[15%]"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <path
            d="M 40 5 L 43 35 L 75 40 L 43 45 L 40 75 L 37 45 L 5 40 L 37 35 Z"
            fill="#ffe7a1"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[25%] right-[20%]"
        animate={{
          y: [0, 25, 0],
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <path
            d="M 30 3 L 32 27 L 57 30 L 32 33 L 30 57 L 28 33 L 3 30 L 28 27 Z"
            fill="#a0d4f1"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[25%]"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <path
            d="M 35 4 L 37.5 31.5 L 66 35 L 37.5 38.5 L 35 66 L 32.5 38.5 L 4 35 L 32.5 31.5 Z"
            fill="#fbcdd7"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[15%]"
        animate={{
          y: [0, -35, 0],
          x: [0, 15, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path
            d="M 25 2 L 27 23 L 48 25 L 27 27 L 25 48 L 23 27 L 2 25 L 23 23 Z"
            fill="#a7e1cd"
            stroke="#fff"
            strokeWidth="3"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Main container */}
      <div className="flex items-center gap-8 max-w-5xl w-full px-8">
        {/* Form section */}
        <div className="flex-1 relative">
          {/* Cloud background */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] -z-10"
            viewBox="0 0 277 145"
          >
            <path
              fill="#fff"
              d="M218,20c-0.74,0-1.47,0.03-2.2,0.06C204.99,7.77,189.16,0,171.5,0c-12.22,0-23.58,3.72-33,10.09 C129.08,3.72,117.72,0,105.5,0C87.84,0,72.01,7.77,61.2,20.06C60.47,20.03,59.74,20,59,20C26.42,20,0,46.42,0,79 c0,32.58,26.42,59,59,59c5.26,0,10.36-0.7,15.21-1.99C83.28,141.7,94,145,105.5,145c12.22,0,23.58-3.72,33-10.09 c9.42,6.37,20.78,10.09,33,10.09c11.5,0,22.22-3.3,31.29-8.99c4.85,1.29,9.95,1.99,15.21,1.99c32.58,0,59-26.42,59-59 C277,46.42,250.58,20,218,20z"
            />
          </svg>

          {/* Form */}
          <form className="space-y-6">
            {/* Title */}
            <motion.h1
              className="text-4xl font-bold text-[#8B7BA8] text-center mb-8"
              style={{ fontFamily: "'Fredoka One', sans-serif" }}
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
                style={{ fontFamily: "'Fredoka One', sans-serif" }}
              >
                PASSWORD
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  fontFamily: "'Fredoka One', sans-serif",
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
                fontFamily: "'Fredoka One', sans-serif",
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
                style={{ fontFamily: "'Fredoka One', sans-serif" }}
              >
                OR
              </span>
              <div className="flex-1 h-1 bg-[#8B7BA8] rounded-full opacity-20" />
            </div>

            {/* Google Login Button */}
            <GoogleLogin />
          </form>
        </div>

        {/* Jar Character */}
        <div className="flex-shrink-0">
          <LoginJar />
        </div>
      </div>
    </div>
  );
}
