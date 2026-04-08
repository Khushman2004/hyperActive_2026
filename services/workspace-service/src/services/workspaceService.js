import Workspace from "../../../../shared/models/Workspace.js";
// import Membership from "../../../shared/models/Membership.js";
// import User from "../../../shared/models/User.js";
import Membership from "../../../../shared/models/Membership.js";
import User from "../../../../shared/models/User.js";

export const createWorkspaceService = async ({ name, userId }) => {
    if (!name) {
        throw new Error("Workspace name is required");
    }

    // 1️⃣ create workspace
    const workspace = await Workspace.create({
        name,
        ownerId: userId,
    });

    // 2️⃣ create membership (owner)
    await Membership.create({
        userId,
        workspaceId: workspace._id,
        role: "owner",
        status: "active",
    });

    // 3️⃣ update user's current workspace
    await User.findByIdAndUpdate(userId, {
        currentWorkspace: workspace._id,
    });

    return workspace;
};

export const getUserWorkspacesService = async (userId) => {
    const memberships = await Membership.find({ userId })
        .populate("workspaceId");

    // 🔥 group by status
    const result = {
        active: [],
        invited: [],
        requested: [],
    };

    memberships.forEach((m) => {
        if (m.status === "active") {
            result.active.push(m.workspaceId);
        } else if (m.status === "invited") {
            result.invited.push(m.workspaceId);
        } else if (m.status === "requested") {
            result.requested.push(m.workspaceId);
        }
    });

    return result;
};