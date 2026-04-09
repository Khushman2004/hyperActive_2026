import { useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";
import { FileText, Folder, Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`h-screen bg-white border-r transition-all duration-300 flex flex-col
      ${open ? "w-64" : "w-16"}`}
    >
      {/* Top */}
      <div className="p-3 flex items-center justify-between">
        {open && <h1 className="font-semibold">Workspace</h1>}
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Workspace Switcher */}
      {workspaces && (
        <div className="px-3">
          <select
            value={currentWorkspace?._id}
            onChange={(e) => {
              const selected = workspaces.active.find(
                (w) => w._id === e.target.value
              );
              if (selected) setCurrentWorkspace(selected);
            }}
            className="w-full text-sm border rounded px-2 py-1"
          >
            {workspaces.active.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>

          {/* Create workspace */}
          <button className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-black">
            <Plus size={16} />
            {open && "New Workspace"}
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="my-4 border-t" />

      {/* Navigation */}
      <div className="flex flex-col gap-1 px-2">
        <NavItem
          icon={<FileText size={18} />}
          label="Notes"
          open={open}
          onClick={() => navigate("/notes")}
        />

        <NavItem
          icon={<Folder size={18} />}
          label="Projects"
          open={open}
          onClick={() => navigate("/projects")}
        />
      </div>

      {/* Bottom */}
      <div className="mt-auto p-2">
        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          open={open}
          onClick={() => navigate("/settings")}
        />
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
    >
      {icon}
      {open && <span className="text-sm">{label}</span>}
    </div>
  );
}