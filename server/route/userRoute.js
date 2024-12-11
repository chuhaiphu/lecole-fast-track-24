
import express from 'express';
import UserController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/:username", UserController.getUserByUsername);
userRouter.get("/", UserController.getAllUsers);

export default userRouter;