const express=require('express')
const router=express.Router();
const cookieParser=require('cookie-parser')
const JWT=require('jsonwebtoken')
router.use(cookieParser());
const {registerModule, loginModule}=require('../controllers/auth.controller')
const user=require('../models/user.model')

router.post('/register',registerModule)
router.post('/login',loginModule)

module.exports=router;