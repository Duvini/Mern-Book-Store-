const mongoose = require ('mongoose');

const dbConnect =()=>{
    mongoose.connect('mongodb+srv://duvini:20020509t@test.p0wfz0h.mongodb.net/',{

}).then(()=>console.log('DB Connected')).catch(err=>console.log(err));

};
module.exports =dbConnect;