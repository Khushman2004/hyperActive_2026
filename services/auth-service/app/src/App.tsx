// src/App.tsx
import "./index.css";
import { Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
// import Dashboard from "../../workspace-service/app/src/pages/Dashboard.tsx";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </div>
    </div>

  );
}
