// src/components/CTA.tsx

import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="text-center py-24 bg-gray-50">
      <h2 className="text-4xl font-semibold mb-6">
        Start organizing today
      </h2>

      <button className="px-8 py-4 bg-black text-white rounded-2xl text-lg shadow-md hover:scale-105 transition">
        <Link to="/register" className="text-white">
            Get Started for free
          </Link>
      </button>
    </section>
  );
}