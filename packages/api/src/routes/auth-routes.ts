import { login, me, signup } from "@/controllers/auth-controller.js";
import { Router } from "express";

const router: Router = Router();

const authPath = "/v1/auth";

router.post(`${authPath}/login`, login);
router.post(`${authPath}/signup`, signup);
router.get(`${authPath}/me`, me);

export default router;
