import express from "express";
import Publisher from "../../models/Publisher";

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        const publisher = await new Publisher(req.body).save();
        res.send({status:200, data:publisher});
    }catch( error ){ 
        next(error);
    }
});


router.get('/', async(req,res, next) =>{

    try{ 
      const publishers = await Publisher.find({});
      res.send({status:200, data:publishers})
    }
    catch(error){
        next(error);
    }
});

router.get('/:id', async(req,res, next) =>{
    try{
        await Publisher.findOne({_id: req.params.id}, (err, publisher) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if ( !publisher ) {
                return res.status(404).json({error: 'publisher not found!'});
            }
            res.send({success : true, data : publisher});
        });
        
    }catch(error){
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        await Publisher.findOneAndRemove({ _id: req.params.id });
        res.send({ success: true, data: "okay" });
    }catch(error){
        next(error);
    }
});

router.put('/:id', async(req, res, next) =>{
    try{
        const publisher = await Publisher.findOneAndUpdate(
            { _id: req.params.id },
            { $set : req.body}
        );
        res.send({ success: true, data: publisher });
    }catch(error){
        next(error);
    }
})

export default router;
