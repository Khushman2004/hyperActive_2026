import { API } from "./client.ts";

export const getUserWorkspaces = (userId: string) =>
    API.get(`/workspace/${userId}`);