import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { getAllUserUrlsController } from '../controller/user.controller.js'
const router = express.Router()

router.get('/urls', authMiddleware, getAllUserUrlsController)




export default router