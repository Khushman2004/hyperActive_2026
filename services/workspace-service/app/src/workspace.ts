export interface Workspace {
  _id: string;
  name: string;
}

export interface WorkspaceResponse {
  active: Workspace[];
  invited: Workspace[];
  requested: Workspace[];
}