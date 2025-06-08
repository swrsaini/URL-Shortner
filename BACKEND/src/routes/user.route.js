import express from 'express'

import { authMiddleware } from '../middleware/auth.middleware.js'
import { getAllUserUrlsController, getUserAnalyticsController, getShortUrlAnalyticsController } from '../controller/user.controller.js'
const router = express.Router()

router.get('/urls', authMiddleware, getAllUserUrlsController)
router.get('/analytics', authMiddleware, getUserAnalyticsController)
router.get('/analytics/:shortUrl', authMiddleware, getShortUrlAnalyticsController)




export default router