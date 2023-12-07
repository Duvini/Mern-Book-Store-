const express =require('express');
const mongoose = require ('mongoose');
require('./config/dbConnect')();

const app =express();



app.post('/api/users/register',(req,res)=>{
    res.send('Register route');
});

app.post('/api/users/login',(req,res)=>{
    res.send('login route');
});

app.put('/api/users/update',(req,res)=>{
    res.send('Update route');
});

app.delete('/api/users/:id',(req,res)=>{
    res.send('Delete route');
});
app.get('/api/users',(req,res)=>{
    res.send('Fetch Users');
});

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is up and running ${PORT}`);
});