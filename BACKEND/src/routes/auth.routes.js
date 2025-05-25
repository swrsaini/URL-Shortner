import express from "express";
import {register,login, logout, getMe} from "../controller/auth.controller.js"
import wrapAsync from "../utils/tryCatchWrapper.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout', logout)
router.get('/me', authMiddleware, getMe)

export default router