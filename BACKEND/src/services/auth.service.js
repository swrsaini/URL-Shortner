import { createUser, findUserByEmail, findUserByEmailAndPassword, findUserById } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/helper.js";
import bcrypt from 'bcrypt';

export const registerUser = async(name,email,password)=>{
    const user = await findUserByEmail(email);
    if(user) throw new Error("User Already Exists")
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name,email,hashedPassword);
    const token =  signToken({id: newUser._id})
    return token

}

export const loginUser = async(email,password)=>{
    const userDoc = await findUserByEmailAndPassword(email)
    if(!userDoc || !userDoc.password) throw new Error("Invalid Credentials")
    if(typeof userDoc.password !== 'string' || !userDoc.password.startsWith('$2')) throw new Error("Password not hashed. Please re-register.")
    const isMatch = await bcrypt.compare(password, userDoc.password)
    if(!isMatch) throw new Error("Invalid Credentials")
    const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc }
    delete user.password; // Remove password from user object before returning
    const token = signToken({id: user._id})
    return {token,user}
}