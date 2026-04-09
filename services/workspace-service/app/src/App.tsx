import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function Notes() {
  return <div className="p-6">Notes Page</div>;
}

function Projects() {
  return <div className="p-6">Projects Page</div>;
}

function Settings() {
  return <div className="p-6">Settings Page</div>;
}

export default function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}