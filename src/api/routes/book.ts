import express from "express";
import Book from "../../models/Book";

const router = express.Router();

router.post('/', async(req, res, next)=>{
    let hash : string = '';
    while(1){
        for (let i=0; i<6; i++){
            const rand : number = Math.floor(Math.random() * 25) + 65;
            const char : string = String.fromCharCode(rand);
            hash += char;
        }
        const book = await Book.findOne({hash: hash});
        if ( book ){
            hash = '';
            continue;
        }
        break;
    }
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
      const books = await Book.find({publisher : req.query.publisher});
      res.send({status:200, data:books})
    }
    catch(error){
        next(error);
    }
});

router.get('/:id', async(req,res, next) =>{
    try{
        await Book.findOne({_id: req.params.id}, (err, book) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if ( !book ) {
                return res.status(404).json({error: 'Publisher not found!'});
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
