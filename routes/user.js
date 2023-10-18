import express  from "express";
import { register, signIn } from "../controller/user.js";

export const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/signin',signIn);