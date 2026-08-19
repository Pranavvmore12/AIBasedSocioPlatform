const express=require('express')
const app= express();
const authRoute=require('./routes/auth.routes')
const postRoute= require('./routes/post.route')
const JWT=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
app.use(express.json());
app.use(cookieParser()); 


app.use('/auth', authRoute);
app.use('/api/posts', postRoute);


module.exports=app;
