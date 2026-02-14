import { motion } from "framer-motion";

export function CryingJar() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
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
            duration: 4,
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
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "155px 300px" }}
          >
            <ellipse
              cx="125"
              cy="330"
              rx="25"
              ry="40"
              fill="#a7e1cd"
              stroke="#fff"
              strokeWidth="6"
            />
            <ellipse
              cx="125"
              cy="330"
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
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "245px 300px" }}
          >
            <ellipse
              cx="275"
              cy="330"
              rx="25"
              ry="40"
              fill="#a7e1cd"
              stroke="#fff"
              strokeWidth="6"
            />
            <ellipse
              cx="275"
              cy="330"
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
            d="M 115 340 Q 115 390 135 390 L 265 390 Q 285 390 285 340 L 285 220 Q 285 185 270 170 Q 255 160 235 160 L 165 160 Q 145 160 130 170 Q 115 185 115 220 Z"
            fill="url(#jarGradient)"
            stroke="#fff"
            strokeWidth="6"
          />
          <path
            d="M 115 340 Q 115 390 135 390 L 265 390 Q 285 390 285 340 L 285 220 Q 285 185 270 170 Q 255 160 235 160 L 165 160 Q 145 160 130 170 Q 115 185 115 220 Z"
            fill="none"
            stroke="#8B7BA8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sad stars */}
          <motion.g
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M 165 330 L 166.5 340 L 177 341.5 L 166.5 343 L 165 353 L 163.5 343 L 153 341.5 L 163.5 340 Z"
              fill="#ffe7a1"
              stroke="#8B7BA8"
              strokeWidth="3"
              opacity="0.4"
            />
          </motion.g>

          <motion.g
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <path
              d="M 230 310 L 231 318 L 239 319 L 231 320 L 230 328 L 229 320 L 221 319 L 229 318 Z"
              fill="#fbcdd7"
              stroke="#8B7BA8"
              strokeWidth="3"
              opacity="0.4"
            />
          </motion.g>

          {/* Glass shine effect */}
          <motion.ellipse
            cx="145"
            cy="260"
            rx="30"
            ry="70"
            fill="white"
            opacity="0.4"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cork lid */}
          <path
            d="M 130 160 L 130 140 Q 130 125 145 125 L 255 125 Q 270 125 270 140 L 270 160 L 130 160 Z"
            fill="#e6d5b8"
            stroke="#fff"
            strokeWidth="6"
          />
          <path
            d="M 130 160 L 130 140 Q 130 125 145 125 L 255 125 Q 270 125 270 140 L 270 160 L 130 160 Z"
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

          {/* Sad cloud on lid */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "200px 85px" }}
          >
            {/* Rain cloud */}
            <ellipse cx="185" cy="80" rx="18" ry="15" fill="#c9b3e0" stroke="#fff" strokeWidth="5" />
            <ellipse cx="200" cy="75" rx="20" ry="18" fill="#c9b3e0" stroke="#fff" strokeWidth="5" />
            <ellipse cx="215" cy="80" rx="18" ry="15" fill="#c9b3e0" stroke="#fff" strokeWidth="5" />
            <ellipse cx="185" cy="80" rx="18" ry="15" fill="none" stroke="#8B7BA8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="200" cy="75" rx="20" ry="18" fill="none" stroke="#8B7BA8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="215" cy="80" rx="18" ry="15" fill="none" stroke="#8B7BA8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Rain drops */}
            <motion.path
              d="M 190 95 Q 188 100 190 105"
              stroke="#a0d4f1"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeIn",
              }}
            />
            <motion.path
              d="M 200 95 Q 198 100 200 105"
              stroke="#a0d4f1"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeIn",
                delay: 0.3,
              }}
            />
            <motion.path
              d="M 210 95 Q 208 100 210 105"
              stroke="#a0d4f1"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{
                opacity: [0, 1, 0],
                y: [0, 10, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeIn",
                delay: 0.6,
              }}
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

          {/* Sad crying eyes with tears */}
          <motion.g>
            {/* Left eye - sad upward curve */}
            <path
              d="M 160 245 Q 175 240 190 245"
              stroke="#8B7BA8"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <motion.circle
              cx="175"
              cy="248"
              r="3"
              fill="#8B7BA8"
              animate={{
                y: [0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Right eye - sad upward curve */}
            <path
              d="M 210 245 Q 225 240 240 245"
              stroke="#8B7BA8"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <motion.circle
              cx="225"
              cy="248"
              r="3"
              fill="#8B7BA8"
              animate={{
                y: [0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          {/* Tears falling */}
          <motion.g>
            {/* Left tear */}
            <motion.path
              d="M 175 255 Q 173 270 175 285 Q 177 270 175 255 Z"
              fill="#a0d4f1"
              stroke="#8B7BA8"
              strokeWidth="3"
              animate={{
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Falling tear droplet */}
            <motion.ellipse
              cx="175"
              cy="290"
              rx="6"
              ry="8"
              fill="#a0d4f1"
              stroke="#8B7BA8"
              strokeWidth="2"
              animate={{
                y: [0, 60],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeIn",
              }}
            />

            {/* Right tear */}
            <motion.path
              d="M 225 255 Q 223 270 225 285 Q 227 270 225 255 Z"
              fill="#a0d4f1"
              stroke="#8B7BA8"
              strokeWidth="3"
              animate={{
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            {/* Falling tear droplet */}
            <motion.ellipse
              cx="225"
              cy="290"
              rx="6"
              ry="8"
              fill="#a0d4f1"
              stroke="#8B7BA8"
              strokeWidth="2"
              animate={{
                y: [0, 60],
                opacity: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeIn",
                delay: 0.5,
              }}
            />
          </motion.g>

          {/* Sad downturned mouth */}
          <motion.path
            d="M 185 300 Q 200 290 215 300"
            stroke="#8B7BA8"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            animate={{
              d: [
                "M 185 300 Q 200 290 215 300",
                "M 185 300 Q 200 287 215 300",
                "M 185 300 Q 200 290 215 300",
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

        {/* DreamJar Text Overlay */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
        </motion.div>
      </motion.div>
    </div>
  );
}
