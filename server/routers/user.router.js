import express from "express"
import {registerUser,signinUser,SignoutUser} from "../controller/user.controllers.js"

const userRouter = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register new user
 *     responses:
 *       200:
 *         description: User registered successfully
 *
 * /signin:
 *   post:
 *     summary: Signin user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *
 * /signout:
 *   post:
 *     summary: Signout user
 *     responses:
 *       200:
 *         description: Signout successfully
 */
userRouter.post("/signup",registerUser)


userRouter.post("/signin",signinUser)


userRouter.post("/signout",SignoutUser)

export default userRouter;