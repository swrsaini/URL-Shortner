import shortUrl from "../models/shortUrl.model.js"
import User from "../models/user.model.js"

export const findUserByEmail = async(email)=>{
    return await User.findOne({email})
}
export const findUserByEmailAndPassword = async(email)=>{
    return await User.findOne({email}).select('+password')
}

export const findUserById = async(id)=>{
    return await User.findOne({_id: id})
}

export const createUser = async(name,email,password)=>{
    const user =  new User({name,email,password})
    await user.save()
    return user;
}

export const getAllUserUrls = async (id)=>{
    return await shortUrl.find({userId:id})
}