import { useState } from "react";
import { motion } from "framer-motion";
import { LoginJar } from "./LoginJar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import postLogin from "../../api/post-login";
import GoogleLogin from "../GoogleLogin";
import Modal from "../UI/Modal";
import SignUpForm from "../SIgnUpForm/SignUpForm";

export function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [errors, setErrors] = useState({});
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    if (credentials.email && credentials.password) {
      postLogin(credentials.email, credentials.password)
        .then(async (response) => {
          const access = response.access;
          window.localStorage.setItem("access", access);

          const userResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/parents/me`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );

          if (!userResponse.ok) throw new Error("Failed to fetch user.");

          setAuth({ access });
          navigate("/account");
        })
        .catch((error) => {
          setErrors({ non_field_errors: [error.message] });
        });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">

      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Floating Star 1 */}
        <motion.div
          className="absolute top-[10%] left-[15%]"
          animate={{ y: [0, -30, 0], rotate: [0, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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

        {/* Floating Star 2 */}
        <motion.div
          className="absolute top-[25%] right-[20%]"
          animate={{ y: [0, 25, 0], rotate: [360, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
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

        {/* Floating Star 3 */}
        <motion.div
          className="absolute bottom-[20%] left-[25%]"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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

        {/* Jar Background */}
        <div className="absolute bottom-0 right-0 opacity-80 scale-75 sm:scale-90 md:scale-100">
          <LoginJar />
        </div>

      </div>

      {/* =========== FORM ============ */}
      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="glass-panel space-y-5 p-6 sm:p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#8B7BA8] text-center">
            Welcome Back!
          </h1>

          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="form-label">
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

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="form-label">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7BA8] hover:text-[#fbcdd7] transition-colors"
            >
              👁
            </button>
          </div>

          {errors.non_field_errors && (
            <p className="text-red-500 text-sm">
              {errors.non_field_errors.join(" ")}
            </p>
          )}

          {/* Buttons */}
          <button type="submit" className="dj-button w-full">
            Log In
          </button>

          <button
            type="button"
            className="dj-button w-full"
            onClick={() => setShowSignUpModal(true)}
          >
            New Here? Sign up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 bg-[#8B7BA8] rounded-full opacity-20" />
            <span className="text-sm font-bold text-[#8B7BA8]">OR</span>
            <div className="flex-1 h-1 bg-[#8B7BA8] rounded-full opacity-20" />
          </div>

          <GoogleLogin />
        </form>
      </div>

      {/* Modal */}
      <Modal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)}>
        <SignUpForm />
      </Modal>

    </div>
  );
}