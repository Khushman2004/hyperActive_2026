import { createWorkspaceService, getUserWorkspacesService } from "../services/workspaceService.js";

export const createWorkspace = async (req, res) => {
    try {
        const data = await createWorkspaceService(req.body);

        return res.status(201).json({
            message: "Workspace created successfully",
            workspace: data,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

export const getUserWorkspaces = async (req, res) => {
    try {
        const data = await getUserWorkspacesService(req.params.userId);

        return res.json(data);
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};