const express =require('express');
const asynHandler =require('express-async-handler');
const User = require('../models/User');
const usersRoute =express.Router();

usersRoute.post('/register',asynHandler(async (req,res)=>{
    const {name,email,password}=req.body;
    const userExists =await User.findOne({email:email});
    if (userExists){
        throw new Error('User Exists')
    }
    const userCreated =await User.create({name,email,password});
    res.send(userCreated);
})
);

usersRoute.post('/login',(req,res)=>{
    res.send('login route');
});

usersRoute.put('/update',(req,res)=>{
    res.send('Update route');
});

usersRoute.delete('/:id',(req,res)=>{
    res.send('Delete route');
});

usersRoute.get('/',(req,res)=>{
    res.send('Fetch Users');
});
module.exports=usersRoute;