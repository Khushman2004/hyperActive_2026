// src/pages/Register.tsx

import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-6">Create account</h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition">
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-black font-medium">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}