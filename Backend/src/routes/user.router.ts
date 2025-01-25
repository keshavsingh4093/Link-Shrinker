import { login, signUp } from "../controllers/user.controller.ts";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    return await signUp(req, res)
});



userRouter.post("/login", login);

export { userRouter };