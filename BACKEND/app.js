import express from 'express'
import {nanoid} from 'nanoid'
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/shortUrl.model.js';
import shortUrl_router from './src/routes/shortUrl.route.js';
import auth_router from './src/routes/auth.routes.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors'
import userRouter from './src/routes/user.route.js';
import cookieParser from 'cookie-parser';
import { attachUser } from './src/utils/attachUser.js';

dotenv.config({path: './.env'})
const app = express();
// Trust proxy to get correct client IP from x-forwarded-for
app.set('trust proxy', true);
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // <-- important
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)
app.use(cookieParser())
app.use(attachUser)


app.use('/api/create',shortUrl_router)
app.use('/api/auth',auth_router)
app.use('/api/user',userRouter)

app.get('/:id',redirectFromShortUrl)

app.listen(3000, ()=>{
    connectDB()
    console.log('App is running on Port http://localhost:3000')
})