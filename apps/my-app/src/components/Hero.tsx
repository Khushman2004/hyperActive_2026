// src/components/Hero.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="text-center py-28 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-semibold tracking-tight leading-tight mb-6"
      >
        Your brain, <br />
        <span className="text-gray-400">organized.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-500 max-w-2xl mx-auto mb-10"
      >
        Write, plan, and collaborate — all in one clean workspace.
      </motion.p>

      <div className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-black text-white rounded-2xl text-lg shadow-md hover:scale-105 transition">
          <Link to="/register" className="text-white">
            Get Started
          </Link>
        </button>

        <button className="px-6 py-3 border rounded-2xl text-lg hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </section>
  );
}