const express=require('express')
const router=express.Router();
const user=require('../models/user.model')
const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken')

router.post('/register',async (req,res)=>{
    const {username, password}=req.body;
    const token=jwt.sign({ username: username },process.env.JWT_SECRET)

    const userfound=await user.findOne({username})
    if(userfound){
        return res.status(409).send("user already exists");
    }
    await user.create({
        username, password
    })

    res.cookie("token", token);
    return res.status(200).send("user registered successfully");

})
router.post('/login',async (req,res)=>{
    const {username, password}=req.body;
    const savedUser=jwt.verify(token,process.env.JWT_SECRET);
    console.log(savedUser);

})
module.exports=router;