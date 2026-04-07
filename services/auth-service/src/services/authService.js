// src/services/authService.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../../shared/models/User.js";

export const loginUser = async ({ email, password }) => {
    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

export const registerUser = async ({ name, email, password }) => {
    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};
