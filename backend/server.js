const express =require('express');
const mongoose = require ('mongoose');
const dotenv =require('dotenv');
const User = require('./models/User');
const usersRoute = require('./routes/useresRoute');
const error = require('./middleware/errorMiddlewearHandler');
const bookRouter = require('./routes/bookRoute');




dotenv.config();
require('./config/dbConnect')();
const app =express();

//passing body data
app.use(express.json());
//users
app.use('/api/users',usersRoute);
//books
app.use('/api/books',bookRouter);
console.log(process.env.JWT_SECRET_KEY);
//error midleware
app.use(error.errorMiddlewareHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is up and running ${PORT}`);
});