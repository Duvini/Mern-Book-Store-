const express =require('express');
const mongoose = require ('mongoose');
const User = require('./models/User');
const usersRoute = require('./routes/useresRoute');
const error = require('./middleware/errorMiddlewearHandler');


require('./config/dbConnect')();

const app =express();

//passing body data
app.use(express.json());

app.use('/api/users',usersRoute);

//error midleware
app.use(error.errorMiddlewareHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is up and running ${PORT}`);
});