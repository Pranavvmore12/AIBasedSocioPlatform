const express=require("express");
const app=express();
const user=require("../models/user.model");
const bcrypt=require("bcryptjs");
const JWT=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
app.use(cookieParser());

async function registerModule(req, res){
    const {username, password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"username and password are required"});
    }
    if(await user.findOne({username})){
        return res.status(400).json({message:"username already exists"});
    }
    await user.create({username, password: await bcrypt.hash(password, 10)});
    const token=JWT.sign({_id: user._id}, process.env.JWT_SECRET);


    res.cookie("token", token);
    return res.status(201).json({message:"user created successfully"});
}

async function loginModule(req, res){
    const {username, password}=req.body;
    if(!username || !password){
        return res.status(400).json({message:"username and password are required"});
    }
    if(await !user.findOne({username})){
        return res.status(400).json({message:"username does not exist"});
    }
    const userInstance=await user.findOne({username});
    const isMatch=await bcrypt.compare(password, userInstance.password);
    if(!isMatch){
        return res.status(400).json({message:"invalid password"});
    }
    const token=JWT.sign({_id: userInstance._id}, process.env.JWT_SECRET);
    res.cookie("token", token);
    return res.status(200).json({message:"login successful"});


}


module.exports={registerModule, loginModule};