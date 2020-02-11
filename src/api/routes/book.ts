import express from "express";
import Book from "../../models/Book";
import {getHashCode} from '../../modules/getHashCode'

const router = express.Router();

router.post('/', async(req, res, next)=>{
    const hash = getHashCode('book');
    const data = {
        name : req.body.name,
        hash : hash,
        publisher : req.body.publisher,
        code : []
    }
    try{
        const book = await new Book(data).save();
        res.send({status:200, data:book});
    }catch( error ){ 
        next(error);
    }
});


router.get('/', async(req,res, next) =>{
    try{ 
      const books = await Book.find({[req.query] : req.query.publisher});
      res.send({status:200, data:books})
    }
    catch(error){
        next(error);
    }
});

router.get('/:hash', async(req,res, next) =>{
    try{
        await Book.findOne({hash: req.params.hash}, (err, book) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if ( !book ) {
                return res.status(404).json({error: 'book not found!'});
            }
            res.send({success : true, data : book});
        });
        
    }catch(error){
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        await Book.findOneAndRemove({ _id: req.params.id });
        res.send({ success: true, data: "okay" });
    }catch(error){
        next(error);
    }
});

router.put('/:id', async(req, res, next) =>{
    try{
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id },
            { $set : req.body}
        );
        res.send({ success: true, data: book });
    }catch(error){
        next(error);
    }
})

export default router;
