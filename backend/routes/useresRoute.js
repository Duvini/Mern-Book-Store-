const express =require('express');
const asynHandler =require('express-async-handler');
const User = require('../models/User');
const { request } = require('http');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../middleware/authMiddleware');

const usersRoute =express.Router();

usersRoute.post('/register',asynHandler(async (req,res)=>{
    const {name,email,password}=req.body;
    const userExists =await User.findOne({email:email});
    if (userExists){
        throw new Error('User Exists')
    }
    const userCreated =await User.create({email,name,password});
    res.json({
        _id:userCreated._id,
        name:userCreated.name,
        password:userCreated.password,
        email:userCreated.email,
        token:generateToken(userCreated._id),
    });
})
);

usersRoute.post('/login',asynHandler(async(req,res)=>{
    const{email,password}=req.body;
    const user =await User.findOne({email});
    
    if(user && (await user.isPasswordMatch(password))){

        res.status(200);
        res.json({
            _id:user._id,
            name:user.name,
            password:user.password,
            email:user.email,
            token:generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid Credential');
    }
})
);

usersRoute.put('/update',authMiddleware,(req,res)=>{
    res.send('Update route');
});

usersRoute.delete('/:id',(req,res)=>{
    res.send('Delete route');
});

usersRoute.get('/',authMiddleware,(req,res)=>{
    console.log(req.headers);
    res.send(req.user);
});
module.exports=usersRoute;