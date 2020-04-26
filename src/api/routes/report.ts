import express from "express";
import Report from "../../models/Report";
import History from "../../models/History";
import User from "../../models/User";

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        const report = await new Report(req.body).save();
        const history = await History.findOneAndUpdate(
            { _id: req.body.history },
            { $set : {report : report._id }}
        );
        res.send({status:200, data:report});
    }catch( error ){ 
        next(error);
    }
});

router.get('/', async(req, res, next) =>{
    console.log(req.query);
    if ( req.query.publisher !== undefined ) {
        try{ 
            const reports = await Report.find({publisher : req.query.publisher}).populate("book").populate("publisher").populate("user");
            res.send({status:200, data: reports.reverse()})
          }
          catch(error){
              next(error);
          }
    }
    else{
        try{ 
            const reports = await Report.find({}).populate("book").populate("publisher").populate("user");
            res.send({status:200, data:reports})
          }
          catch(error){
              next(error);
          }
    }
    
});

router.get('/:id', async(req : any,res, next) =>{
    try{
        const reports = await Report.find({publisher : req.user._id}).populate("book").populate("publisher").populate("user");
        res.send({status:200, data:reports})
        
    }catch(error){
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        await Report.findOneAndRemove({ _id: req.params.id });
        res.send({ success: true, data: "okay" });
    }catch(error){
        next(error);
    }
});

router.put('/:id', async(req, res, next) =>{
    
    if ( req.body.answer ){
        try{
            const report = await Report.findOneAndUpdate(
                { _id: req.params.id },
                { $set : req.body },
                { new : true }
            );
            res.send({ success: true, data: report });
        }catch(error){
            next(error);
        }
    }
    else{
        try{
            const report = await Report.findOneAndUpdate(
                { _id: req.params.id },
                { $set : {refund : true} },
                { new : true }
            );
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $inc: {coin : req.body.price} },
                { new : true }
            );
            res.send({ success: true, data: report });
        }catch(error){
            next(error);
        }
    }
   

    
});

export default router;
