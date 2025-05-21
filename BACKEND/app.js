import express from 'express'
import {nanoid} from 'nanoid'
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/shortUrl.model.js';
import shortUrl_router from './src/routes/shortUrl.route.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors'

dotenv.config({path: './.env'})
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)

app.use('/api/create',shortUrl_router)

app.get('/:id',redirectFromShortUrl)

app.listen(3000, ()=>{
    connectDB()
    console.log('App is running on Port http://localhost:3000')
})