import { useState } from "react";
import { useWorkspace } from "../context/WorkspaceContext";

export default function Sidebar() {
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);

  if (!workspaces) return <div className="w-16 p-2">...</div>;

  return (
    <div
      className={`h-screen border-r transition-all ${
        open ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="p-2">
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Workspace */}
      <div className="p-2">
        <select
          value={currentWorkspace?._id}
          onChange={(e) => {
            const selected = workspaces.active.find(
              (w) => w._id === e.target.value
            );
            if (selected) setCurrentWorkspace(selected);
          }}
          className="w-full text-sm"
        >
          {workspaces.active.map((w) => (
            <option key={w._id} value={w._id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Nav */}
      <div className="p-2 flex flex-col gap-2">
        <div>📄 {open && "Notes"}</div>
        <div>📁 {open && "Projects"}</div>
      </div>
    </div>
  );
}