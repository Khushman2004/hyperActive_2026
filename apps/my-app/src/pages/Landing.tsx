// src/pages/Landing.tsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <Hero />

      <Features />

      <CTA />

      <footer className="text-center py-10 text-gray-400 text-sm border-t">
        © 2026 HyperActive
      </footer>
    </div>
  );
}