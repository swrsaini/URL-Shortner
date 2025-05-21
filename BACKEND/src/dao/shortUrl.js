import urlSchema from '../models/shortUrl.model.js'


export const saveShortUrl = async (url,shortUrl,userId)=>{
    try{
        const newUrl = new urlSchema({
            full_url:url,
            short_url:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
}

export const getShortUrl = async(id)=>{
        const url = await urlSchema.findOneAndUpdate({short_url:id},{$inc:{clicks:1}})
        return url
}