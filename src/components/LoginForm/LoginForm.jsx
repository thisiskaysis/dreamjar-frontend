import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginJar } from "./LoginJar";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailText, setEmailText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google login logic here
  };

  const handleSignUp = () => {
    console.log("Sign up")
  };

  const reset = () => {
    setIsDisabled(false);
    setIsValid(false);
    setIsNotValid(false);
    setEmailText("");
    setShowPassword(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <motion.h1
              className="text-4xl font-bold text-[#8B7BA8] text-center mb-8"
              style={{ fontFamily: "'Fredoka One', sans-serif" }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome Back!
            </motion.h1>

            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-3 left-4 text-xs font-bold text-[#8B7BA8] bg-[#fcf2f5] px-2"
                style={{ fontFamily: "'Fredoka One', sans-serif" }}
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isDisabled}
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  fontFamily: "'Fredoka One', sans-serif",
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="your@email.com"
                required
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
                className="w-full h-14 px-4 pr-16 rounded-full border-4 border-[#8B7BA8] bg-[#f9dde3] text-[#8B7BA8] text-xl font-bold focus:outline-none focus:border-[#fbcdd7] disabled:bg-[#fcf2f5] disabled:border-[#f9dde3] transition-all duration-300"
                style={{
                  fontFamily: "'Fredoka One', sans-serif",
                  caretColor: "#fbcdd7",
                  boxShadow: "3px 3px 0 #8B7BA8",
                }}
                placeholder="••••••••"
                required
              />
            </div>


            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              disabled={isDisabled}
            >
              Log In
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
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {/* Google Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </motion.button>

            {/* Sign Up Button */}
            <motion.button
              type="button"
              onClick={handleSignUp}
              whileHover={{ y: -2,}}
              whileTap={{ y: 0 }}
            >
              Sign Up
            </motion.button>
          </form>
        </div>

        {/* Jar Character */}
        <div className="flex-shrink-0">
          <LoginJar swallow={isValid} spit={isNotValid} onAnimationDone={reset} />
        </div>
      </div>
    </div>
  );
}
