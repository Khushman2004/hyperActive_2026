// src/App.tsx

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "../../../services/auth-service/app/src/pages/Login.tsx";
import Register from "../../../services/auth-service/app/src/pages/Register.tsx";
import WorkspaceApp from "../../../services/workspace-service/app/src/App.tsx";
import { WorkspaceProvider } from "../../../services/workspace-service/app/src/context/WorkspaceContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
// import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Routes>
          {/* <Sidebar /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <WorkspaceProvider>
                  <WorkspaceApp />
                </WorkspaceProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>

  );
}
