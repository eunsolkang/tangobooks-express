import express from "express";
import Report from "../../models/Report";

const router = express.Router();

router.post('/', async(req, res, next)=>{
    try{
        const report = await new Report(req.body).save();
        res.send({status:200, data:report});
    }catch( error ){ 
        next(error);
    }
});

router.get('/', async(req,res, next) =>{
    try{ 
      const reports = await Report.find({}).populate("book").populate("publisher").populate("user");
      res.send({status:200, data:reports})
    }
    catch(error){
        next(error);
    }
});

// router.get('/:id', async(req,res, next) =>{
//     try{
//         await Post.findOne({_id: req.params.id}, (err, post) => {
//             if (err) {
//                 return res.status(500).json({error: err});
//             }
//             if ( !post ) {
//                 return res.status(404).json({error: 'report not found!'});
//             }
//             res.send({success : true, data : post});
//         });
        
//     }catch(error){
//         next(error);
//     }
// });

// router.delete('/:id', async(req, res, next) => {
//     try{
//         await Report.findOneAndRemove({ _id: req.params.id });
//         res.send({ success: true, data: "okay" });
//     }catch(error){
//         next(error);
//     }
// });

router.put('/:id', async(req, res, next) =>{
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
})

export default router;
