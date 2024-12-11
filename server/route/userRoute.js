
import express from 'express';
import UserController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/register", UserController.registerUser);
userRouter.get("/:username", UserController.getUserByUsername);

export default userRouter;
