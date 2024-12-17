import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { hashPassword } from "@/services/passwords.js";
import { createUser, getUserByEmail, getUserByUsername } from "@/db/auth.js";
import { validatePassword } from "@/services/passwords.js";

export const SYSTEM = "system";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Use environment variable for production
const JWT_EXPIRES_IN = "1h"; // Token expiry (adjust as needed)

export const login = async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Validate Input
    const errors: string[] = [];
    if (!emailOrUsername) errors.push("Email or username is required.");
    if (!password) errors.push("Password is required.");
    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }

    // Determine if email or username and retrieve user
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;

    if (emailRegex.test(emailOrUsername)) {
      user = await getUserByEmail(emailOrUsername);
    } else {
      user = await getUserByUsername(emailOrUsername);
    }

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", errors: ["User not found."] });
    }

    console.log(`Retrieved User: ${JSON.stringify(user)}`);

    const isPasswordValid = await validatePassword(
      password,
      user.hashedPassword,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "error", errors: ["Invalid password."] });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful.",
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      errors: ["An unexpected error occurred. Please try again later."],
    });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, termsAccepted } = req.body;
  const hashedPassword = await hashPassword(password);
  const response = await createUser({
    email,
    username,
    hashedPassword,
    termsAccepted,
    createdBy: SYSTEM,
    updatedBy: SYSTEM,
  });

  /**
   * @todo: better response than the db raw response.
   */
  res.status(200).json({
    status: "success",
    data: response,
  });
};

export const me = async (req: Request, res: Response) => {
  const results = {};
  res.status(200).json({ status: "success", data: results });
};
