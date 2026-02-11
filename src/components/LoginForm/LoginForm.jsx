import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginJar } from "./LoginJar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import postLogin from "../../api/post-login";
import GoogleLogin from "../GoogleLogin";
import Modal from "../UI/Modal"
import SignUpForm from "../SIgnUpForm/SignUpForm"

export function LoginForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const [errors, setErrors] = useState({});
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
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
    setErrors({});

    if (credentials.email && credentials.password) {
      postLogin(
        credentials.email, credentials.password)
        .then(async (response) => {
        const access = response.access;
        window.localStorage.setItem("access", response.access);

        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/parents/me`, {
          headers: {
            "Authorization": `Bearer ${access}`,
          },
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user.");

        const userData = await userResponse.json();
        window.localStorage.setItem("access", access);

        setAuth({
          access,
        });

        navigate("/account");
      })

      .catch((error) => {
        setErrors({ non_field_errors: [error.message] });
      });
    }
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  }

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  }

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
      <div className="flex items-center gap-8 max-w-3xl w-full px-8">
        {/* Form section */}
        <div className="flex-1 relative">
          {/* Form */}
          <form className="space-y-6">
            {/* Title */}
            <h1
              className="text-8xl font-bold text-[#8B7BA8] text-center mb-8"
            >
              Welcome Back!
            </h1>

            {/* Email Input */}
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
                className="dream-input"
                placeholder="your@email.com"
                required
                onChange={handleChange}
              />
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
                className="dream-input"
                placeholder="••••••••"
                required
                onChange={handleChange}
              />
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
              <p className="text-red-500 text-sm mb-2">{errors.non_field_errors.join(" ")}
              </p>
            )}


            {/* Submit Button */}
            <button
              type="submit"
              className="dj-button w-full my-1"
            >
              Log In
            </button>

            {/* Sign Up Button */}
            <button
              type="button"
              className="dj-button w-full"
              onClick={openSignUpModal}
            >
              New Here? Sign up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-1">
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

        {/* Jar Character */}
        <div className="flex-shrink-0">
          <LoginJar />
        </div>
      </div>
      <Modal isOpen={showSignUpModal} onClose={closeSignUpModal}>
      <SignUpForm />
    </Modal>
    </div>
  );
}