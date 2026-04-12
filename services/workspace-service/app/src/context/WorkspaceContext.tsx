import { createContext, useContext, useEffect, useState } from "react";
import { getUserWorkspaces } from "../api/workspace";
import type { Workspace, WorkspaceResponse } from "../workspace";

interface WorkspaceContextType {
  workspaces: WorkspaceResponse | null;
  currentWorkspace: Workspace | null;
  setCurrentWorkspace: (w: Workspace) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceResponse | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await getUserWorkspaces(userId);
      setWorkspaces(res.data);

      if (res.data.active.length > 0) {
        setCurrentWorkspace(res.data.active[0]);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, currentWorkspace, setCurrentWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside provider");
  return ctx;
};