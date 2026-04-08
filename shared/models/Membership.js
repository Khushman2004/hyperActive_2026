import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
        },

        role: {
            type: String,
            enum: ["owner", "admin", "member"],
            default: "member",
        },

        status: {
            type: String,
            enum: ["active", "invited", "requested"],
            default: "active",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Membership", membershipSchema);