import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register = wrapAsync(async(req,res)=>{
    const {name,email,password} = req.body
    const token = await registerUser(name,email,password)
    
    res.cookie('token',token, cookieOptions)
    res.status(200).json({message: 'Account Created'})
});

export const login = wrapAsync(async(req,res)=>{
    const {email,password} = req.body
    const {token,user} = await loginUser(email,password)
    req.user = user;
    res.cookie('accessToken',token,cookieOptions)
    res.status(200).json({message: 'Login Success'})
})