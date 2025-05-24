import { generateNanoId } from "../utils/helper.js";
import urlSchema from '../models/shortUrl.model.js'
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";


export const createShortUrlWithoutUser = async(url)=>{
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short URL not generated")
    await saveShortUrl(url,shortUrl);
    return process.env.APP_NAME + shortUrl
}

export const createShortUrlWithUser = async(url,slug=null,userId)=>{
    const shortUrl = slug || generateNanoId(7)
    if(slug){
        const exists = await getCustomShortUrl(slug)
        if(exists) throw new Error("This custom url already exists")
    } 
    await saveShortUrl(url,shortUrl,userId);
    return process.env.APP_NAME + shortUrl
}