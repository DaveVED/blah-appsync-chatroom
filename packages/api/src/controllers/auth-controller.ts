import { Request, Response } from "express";

/**
 * Checks if a users email/username combo are valid in the database, if not
 * combination is found, we create one for them. 
 * 
 * @param req 
 * @param res 
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    res.status(200).json({
        status: "success",
        data: {
            email,
            password,
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