const express=require('express')
const router=express.Router();
const cookieParser=require('cookie-parser')
router.use(cookieParser());
const JWT=require('jsonwebtoken')
const {registerModule, loginModule}=require('../controllers/auth.controller')
const user=require('../models/user.model')  


async function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = JWT.verify(
            token,
            process.env.JWT_SECRET
        );

        const authorizedUser = await user.findOne({
            _id: decoded._id
        });

        if (!authorizedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = authorizedUser;

        console.log(authorizedUser);
        console.log(decoded);

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}
module.exports=authMiddleware;