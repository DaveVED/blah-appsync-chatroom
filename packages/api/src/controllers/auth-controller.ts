import { createUser } from "@/db/auth.js";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashed_password = await Bun.password.hash(password);
    const temp = await createUser({email, hashed_password});
    console.log(`tmep ${temp}`);
    const isMatch = await Bun.password.verify(password, hashed_password);
    res.status(200).json({
        status: "success",
        data: {
            email,
            password,
            hashed_password,
            isMatch
        },
    });
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.status(200).json({
        status: "success",
        data: {
            email,
            password,
        },
    });
}

export const me = async (req: Request, res: Response) => {
    const results = {};
    res.status(200).json({ status: "success", data: results });
}