import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CryingJar } from "../components/CryingJar";

export default function NotFound() {
  return (
    <div className="relative min-h-screen text-center p-6 overflow-hidden">
      {/* Crying Jar floating at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg">
        <CryingJar />
      </div>

      {/* Foreground 404 content, slightly overlapping jar */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-start mt-[50vh]" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-9xl font-bold text-purple-700 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Did you get lost?
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-400 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Back to DreamJar
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
