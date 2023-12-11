const express =require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');




const bookRouter =express.Router();

//create Book
bookRouter.post('/',expressAsyncHandler(async(req,res)=>{
    const book = await Book.create(req.body);
    
    if(book){
        res.status(200);
        res.json(book);

    }else{
        res.status(500);
        throw new Error('Book Creating failed');
    }
})
);

bookRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const book = await Book.find({});
    if(book){
        res.status(200);
        res.json(book);

    }else{
        res.status(500);
        throw new Error('There are no Books');
    }
})
);
bookRouter.put('/:id',authMiddleware,expressAsyncHandler(async(req,res)=>{
   const book= await Book.findById(req.params.id);

   if(book){
    const updatedBook = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    }
    );
    res.status(200);
    res.json(updatedBook);
   }else{
    res.status(500);
    throw new Error('Update failed');
   }
})
);
bookRouter.delete('/:id',expressAsyncHandler(async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);

        res.status(200);
        res.send(book);
    }catch(error){
        res.json(error);
    }
})
);

module.exports=bookRouter;