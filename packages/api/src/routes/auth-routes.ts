  import { login, me, register } from "@/controllers/auth-controller.js";
import { Router } from "express";
  
  const router: Router = Router();
  
  const authPath = "/v1/auth";
  
  router.get(`${authPath}/login`, login);
  router.post(`${authPath}/register`, register);
  router.get(`${authPath}/me`, me);

  export default router;