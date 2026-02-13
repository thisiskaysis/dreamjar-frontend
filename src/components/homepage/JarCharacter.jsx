import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function JarCharacter() {
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
        <div className="absolute inset-0 -z-10 flex justify-center items-center opacity-80 pointer-events-none">
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

      <motion.div
        className="relative -translate-y-10"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Background glow circles */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-white opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Shadow */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-6 bg-[#c9b3e0] rounded-full opacity-30 blur-md"
          animate={{
            scaleX: [1, 0.85, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main jar with arms and legs */}
        <svg
          width="400"
          height="500"
          viewBox="0 0 400 500"
          className="drop-shadow-2xl"
        >
          {/* Left arm */}
          <motion.g
            animate={{
              rotate: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "155px 300px" }}
          >
            <ellipse
              cx="125"
              cy="320"
              rx="25"
              ry="40"
              fill="#a7e1cd"
              stroke="#fff"
              strokeWidth="6"
            />
            <ellipse
              cx="125"
              cy="320"
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
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "245px 300px" }}
          >
            <ellipse
              cx="275"
              cy="320"
              rx="25"
              ry="40"
              fill="#a7e1cd"
              stroke="#fff"
              strokeWidth="6"
            />
            <ellipse
              cx="275"
              cy="320"
              rx="20"
              ry="35"
              fill="#a7e1cd"
              stroke="#8B7BA8"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Jar bottom gradient section */}
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

          {/* Main jar body */}
          <path
            d="M 115 360 L 115 200 Q 115 185 125 175 L 135 165 L 265 165 L 275 175 Q 285 185 285 200 L 285 360 Q 285 390 265 390 L 135 390 Q 115 390 115 360 Z"
            fill="url(#jarGradient)"
            stroke="#fff"
            strokeWidth="6"
          />
          <path
            d="M 115 360 L 115 200 Q 115 185 125 175 L 135 165 L 265 165 L 275 175 Q 285 185 285 200 L 285 360 Q 285 390 265 390 L 135 390 Q 115 390 115 360 Z"
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

          <motion.g
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <path
              d="M 155 250 L 156 257 L 163 258 L 156 259 L 155 266 L 154 259 L 147 258 L 154 257 Z"
              fill="#a7e1cd"
              stroke="#8B7BA8"
              strokeWidth="2.5"
            />
          </motion.g>

          <motion.g
            animate={{
              y: [0, -22, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <path
              d="M 240 260 L 241.5 269 L 250.5 270.5 L 241.5 272 L 240 281 L 238.5 272 L 229.5 270.5 L 238.5 269 Z"
              fill="#c9b3e0"
              stroke="#8B7BA8"
              strokeWidth="3"
            />
          </motion.g>

          {/* Tiny sparkles */}
          <motion.circle
            cx="175"
            cy="310"
            r="3"
            fill="#ffe7a1"
            filter="url(#glow)"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="215"
            cy="240"
            r="2.5"
            fill="#fff"
            filter="url(#glow)"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.circle
            cx="170"
            cy="220"
            r="2"
            fill="#fbcdd7"
            filter="url(#glow)"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

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

          {/* Cork lid with rounded top */}
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

          {/* Cork lid shine */}
          <ellipse
            cx="155"
            cy="145"
            rx="12"
            ry="10"
            fill="white"
            opacity="0.6"
          />

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
            {/* Moon */}
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

          {/* Eyes - bigger and sparklier */}
          <motion.g
            animate={{
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{
              duration: 0.1,
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

          {/* Sweet closed smile */}
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

          {/* Feet */}
          {/* Left foot */}
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

          {/* Right foot */}
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

        {/* Floating wish papers around jar */}
        <motion.div
          className="absolute top-[20%] left-[-60px]"
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect x="10" y="10" width="30" height="30" rx="3" fill="#ffe7a1" stroke="#8B7BA8" strokeWidth="3" />
            <line x1="15" y1="20" x2="35" y2="20" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="26" x2="35" y2="26" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="32" x2="28" y2="32" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-[35%] right-[-70px]"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect x="10" y="10" width="30" height="30" rx="3" fill="#a0d4f1" stroke="#8B7BA8" strokeWidth="3" />
            <line x1="15" y1="20" x2="35" y2="20" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="26" x2="35" y2="26" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="32" x2="28" y2="32" stroke="#8B7BA8" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}