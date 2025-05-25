import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async(req,res)=>{
    const {url,slug} = req.body
    let short_url;
    try {
        if(req.user){
            short_url = await createShortUrlWithUser(url,slug,req.user._id);
        }
        else{
            short_url = await createShortUrlWithoutUser(url);
        }
        return res.status(200).json(short_url)
    } catch (err) {
        if (err.message === "This custom url already exists") {
            return res.status(409).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
})




export const redirectFromShortUrl = wrapAsync(async(req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(url){
        
        return res.redirect(url.full_url);
    }
    else{
        return res.status(404).send('Not Found')
    }
})