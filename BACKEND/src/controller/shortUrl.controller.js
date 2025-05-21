import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async(req,res)=>{
    const {url} = req.body
    const short_url = await createShortUrlWithoutUser(url);
    
    res.send(short_url)
})

export const redirectFromShortUrl = wrapAsync(async(req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(url){
        
        res.redirect(url.full_url);
    }
    else{
        res.status(404).send('Not Found')
    }
})