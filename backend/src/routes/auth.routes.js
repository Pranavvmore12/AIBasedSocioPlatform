const express=require('express')
const router=express.Router();
const {registerModule, loginModule}=require('../controllers/auth.controller')

router.post('/register',registerModule)
router.post('/login',loginModule)
module.exports=router;