// src/controllers/authController.js

import { loginUser, registerUser } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);

    res.json({
      message: "Login successful",
      ...data,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};