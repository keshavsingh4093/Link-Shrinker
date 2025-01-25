import { login, signUp } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/login", login);

export { userRouter };