import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.tsx";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      // alert("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold mb-6">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3"
        />

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Login
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-black font-medium">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}