import express from "express";
import { createWorkspace, getUserWorkspaces } from "../controllers/workspaceController.js";

const router = express.Router();

router.get("/:userId", getUserWorkspaces);
router.post("/workspace", createWorkspace);

export default router;