import Sidebar from "./components/Sidebar.tsx";
import Dashboard from "./pages/Dashboard.tsx";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Dashboard />
      </div>
    </div>
  );
}