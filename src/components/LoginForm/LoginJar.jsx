import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function LoginJar({ swallow = false, spit = false, onAnimationDone }) {
  const [isBlinking, setIsBlinking] = useState(false);

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(blinkInterval);
  }, []);


  return (
    <motion.div
      className="relative"
      animate={{
        y: swallow ? [0, -10, -5, 0] : spit ? [0, 10, -5, 0] : [0, -15, 0],
        scale: swallow ? [1, 1.05, 1.02, 1] : spit ? [1, 0.95, 1.02, 1] : 1,
      }}
      transition={{
        y: {
          duration: swallow || spit ? 1.5 : 2.5,
          repeat: swallow || spit ? 0 : Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: swallow || spit ? 1.5 : 2.5,
          repeat: swallow || spit ? 0 : Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* Main jar with arms and legs */}
      <svg
        width="280"
        height="350"
        viewBox="0 0 400 500"
        className="drop-shadow-2xl"
      >
        {/* Left arm */}
        <motion.g
          animate={{
            rotate: swallow ? [0, -30, -25, 0] : spit ? [0, 20, -10, 0] : [0, -15, 0],
          }}
          transition={{
            duration: swallow || spit ? 1.5 : 2,
            repeat: swallow || spit ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "155px 280px" }}
        >
          <ellipse
            cx="125"
            cy="300"
            rx="25"
            ry="40"
            fill="#a7e1cd"
            stroke="#fff"
            strokeWidth="6"
          />
          <ellipse
            cx="125"
            cy="300"
            rx="20"
            ry="35"
            fill="#a7e1cd"
            stroke="#8B7BA8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Right arm */}
        <motion.g
          animate={{
            rotate: swallow ? [0, 30, 25, 0] : spit ? [0, -20, 10, 0] : [0, 15, 0],
          }}
          transition={{
            duration: swallow || spit ? 1.5 : 2,
            repeat: swallow || spit ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "245px 280px" }}
        >
          <ellipse
            cx="275"
            cy="300"
            rx="25"
            ry="40"
            fill="#a7e1cd"
            stroke="#fff"
            strokeWidth="6"
          />
          <ellipse
            cx="275"
            cy="300"
            rx="20"
            ry="35"
            fill="#a7e1cd"
            stroke="#8B7BA8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Jar gradient */}
        <defs>
          <linearGradient id="jarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a0d4f1" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#c9b3e0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fbcdd7" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main jar body - rounded like a piggy bank */}
        <ellipse
          cx="200"
          cy="270"
          rx="95"
          ry="115"
          fill="url(#jarGradient)"
          stroke="#fff"
          strokeWidth="6"
        />
        <ellipse
          cx="200"
          cy="270"
          rx="95"
          ry="115"
          fill="none"
          stroke="#8B7BA8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Floating stars inside jar */}
        <motion.g
          animate={{
            y: [0, -15, 0],
            opacity: swallow || spit ? [1, 0.3, 1] : 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M 165 340 L 166.5 350 L 177 351.5 L 166.5 353 L 165 363 L 163.5 353 L 153 351.5 L 163.5 350 Z"
            fill="#ffe7a1"
            stroke="#8B7BA8"
            strokeWidth="3"
          />
        </motion.g>

        <motion.g
          animate={{
            y: [0, -20, 0],
            opacity: swallow || spit ? [1, 0.3, 1] : 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <path
            d="M 230 320 L 231 328 L 239 329 L 231 330 L 230 338 L 229 330 L 221 329 L 229 328 Z"
            fill="#fbcdd7"
            stroke="#8B7BA8"
            strokeWidth="3"
          />
        </motion.g>

        <motion.g
          animate={{
            y: [0, -25, 0],
            opacity: swallow || spit ? [1, 0.3, 1] : 1,
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <path
            d="M 195 280 L 197 292 L 209 294 L 197 296 L 195 308 L 193 296 L 181 294 L 193 292 Z"
            fill="#a0d4f1"
            stroke="#8B7BA8"
            strokeWidth="3"
          />
        </motion.g>

        {/* Glass shine effect */}
        <motion.ellipse
          cx="145"
          cy="260"
          rx="30"
          ry="70"
          fill="white"
          opacity="0.5"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cork lid */}
        <path
          d="M 130 165 L 130 140 Q 130 125 145 125 L 255 125 Q 270 125 270 140 L 270 165 L 130 165 Z"
          fill="#e6d5b8"
          stroke="#fff"
          strokeWidth="6"
        />
        <path
          d="M 130 165 L 130 140 Q 130 125 145 125 L 255 125 Q 270 125 270 140 L 270 165 L 130 165 Z"
          fill="none"
          stroke="#8B7BA8"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cork texture lines */}
        <rect x="145" y="135" width="110" height="3" fill="#d4c4a8" rx="1.5" opacity="0.6" />
        <rect x="145" y="145" width="110" height="3" fill="#d4c4a8" rx="1.5" opacity="0.6" />
        <rect x="145" y="155" width="110" height="3" fill="#d4c4a8" rx="1.5" opacity="0.6" />

        {/* Top cork knob */}
        <ellipse
          cx="200"
          cy="115"
          rx="35"
          ry="18"
          fill="#f5e8d3"
          stroke="#fff"
          strokeWidth="6"
        />
        <ellipse
          cx="200"
          cy="115"
          rx="35"
          ry="18"
          fill="none"
          stroke="#8B7BA8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cute moon sitting on lid */}
        <motion.g
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "200px 85px" }}
        >
          <path
            d="M 200 65 Q 185 65 180 75 Q 185 85 200 85 Q 215 85 220 75 Q 215 65 200 65 Z"
            fill="#ffe7a1"
            stroke="#fff"
            strokeWidth="5"
          />
          <path
            d="M 200 65 Q 185 65 180 75 Q 185 85 200 85 Q 215 85 220 75 Q 215 65 200 65 Z"
            fill="none"
            stroke="#8B7BA8"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Moon eyes */}
          <circle cx="193" cy="75" r="3" fill="#8B7BA8" />
          <circle cx="207" cy="75" r="3" fill="#8B7BA8" />
          {/* Moon smile */}
          <path
            d="M 194 79 Q 200 82 206 79"
            stroke="#8B7BA8"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Face on jar */}
        {/* Blush marks */}
        <motion.ellipse
          cx="155"
          cy="275"
          rx="22"
          ry="15"
          fill="#fbcdd7"
          opacity="0.9"
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.ellipse
          cx="245"
          cy="275"
          rx="22"
          ry="15"
          fill="#fbcdd7"
          opacity="0.9"
          animate={{
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Eyes */}
        <motion.g
          animate={{
            scaleY: isBlinking ? 0.1 : 1,
            y: swallow ? [0, -5, 0] : spit ? [0, 5, 0] : 0,
          }}
          transition={{
            scaleY: {
              duration: 0.1,
            },
            y: {
              duration: swallow || spit ? 1.5 : 0.1,
              ease: "easeInOut",
            },
          }}
        >
          {/* Left eye */}
          <circle cx="175" cy="250" r="24" fill="#8B7BA8" />
          <circle cx="181" cy="244" r="10" fill="#fff" />
          <circle cx="184" cy="240" r="5" fill="#fff" />
          
          {/* Right eye */}
          <circle cx="225" cy="250" r="24" fill="#8B7BA8" />
          <circle cx="231" cy="244" r="10" fill="#fff" />
          <circle cx="234" cy="240" r="5" fill="#fff" />
        </motion.g>

        {/* Mouth - changes based on animation state */}
          <motion.path
            d="M 185 285 Q 200 295 215 285"
            stroke="#8B7BA8"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M 185 285 Q 200 295 215 285",
                "M 185 285 Q 200 298 215 285",
                "M 185 285 Q 200 295 215 285",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )

        {/* Feet */}
        <ellipse
          cx="165"
          cy="410"
          rx="24"
          ry="18"
          fill="#a7e1cd"
          stroke="#fff"
          strokeWidth="6"
        />
        <ellipse
          cx="165"
          cy="410"
          rx="24"
          ry="18"
          fill="none"
          stroke="#8B7BA8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <ellipse
          cx="235"
          cy="410"
          rx="24"
          ry="18"
          fill="#a7e1cd"
          stroke="#fff"
          strokeWidth="6"
        />
        <ellipse
          cx="235"
          cy="410"
          rx="24"
          ry="18"
          fill="none"
          stroke="#8B7BA8"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
