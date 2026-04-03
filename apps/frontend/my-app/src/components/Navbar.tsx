// src/components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5">
      <h1 className="text-2xl font-semibold tracking-tight">MyApp</h1>

      <div className="flex items-center gap-6">
       <Link to="/login" className="text-gray-600 hover:text-black">
  Login
</Link>

<Link
  to="/register"
  className="px-5 py-2 bg-black text-white rounded-xl"
>
  Get Started
</Link>
      </div>
    </nav>
  );
}