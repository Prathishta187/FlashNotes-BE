import User from "../model/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"


export async function signUpUser(req,res){
    const {username,email,password} = req.body
    try{
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({username,email,password:hashedPassword})
        res.status(201).json({message:"User sign Up is successfully"})

    }catch(e){
        console.log(e)
        res.status(500).json({message:e})
    }
}

export async function loginUser(req,res){
    console.log(req.body)
    const {username,password} = req.body
    try{
        const existingUser = await User.findOne({username}) 
        if(!existingUser){
            return res.status(400).json({message:"User not registered"})
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
        }else{
            const secret_code = process.env.MY_SECRET
            const payload = {
                id:existingUser._id,
                username:existingUser.username,
                email:existingUser.email
            }
            const jwtToken = jwt.sign(payload,secret_code,{expiresIn:"1h"})
            res.status(200).json({message:"Login successful",jwt_token:jwtToken})
        }

    }catch(e){
        res.status(500).json({message:e})
    }
}