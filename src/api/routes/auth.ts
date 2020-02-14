import express from "express";
import passport from 'passport'
import { getToken } from '../../modules/getToken';
import User, { UserModel } from '../../models/User';
import Book, { BookModel } from '../../models/Book';
import { validateBody } from '../../modules/validateBody';
import config from "../../config/vars";

const router = express.Router();

router.get('/kakao', 
    (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    },passport.authenticate("kakao-login")
);

router.get(
    "/kakao/callback",
    passport.authenticate("kakao-login", {
      failureRedirect: `${config.client.uri}/login`,
      session: true
    }), async(req :any, res, next) => {
      if ( req.user.done ) {
        req.session.save(function(){
          res.redirect(config.client.uri)
        });
      }
      else {
        req.session.save(function(){
          res.redirect(`${config.client.uri}/register?code=${req.user.hash}`)
        });
      }
    }
);



router.get('/me', async(req : any, res, next)=>{
  if (req.isAuthenticated()) {
    const user = await User.findById(req.user._id).populate('library')
    res.send({
      data : user
    })
  }
  else{
    const data = {
      username : "손",
      hash : "geust"
    }
    res.send({
      data : data
    })
  }
})


router.put('/user/:id', async(req : any, res, next)=>{
  console.log(req.body);
  const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set : req.body},
      {new : true}
  ).populate('library');
  res.send({ success: true, data: user });
})

router.put('/lib/:hash', async(req : any, res, next)=>{
  try{
    const book = await Book.findOne({ hash: req.params.hash }) as unknown as BookModel;
    const newUser = await User.findOneAndUpdate(
      { _id: req.user._id},
      { $addToSet : {library : book._id}},
      {new : true}
    ).populate('library');
    res.send({
      status : 200,
      data : newUser
    })
  }catch(error){
    next(error);
  }
});
router.delete('/lib/:hash', async(req : any, res, next)=>{
  try{
    const book = await Book.findOne({ hash: req.params.hash }) as unknown as BookModel;
    const newUser = await User.findOneAndUpdate(
      { _id: req.user._id},
      { $pull : {library : book._id}},
      {new : true}
    ).populate('library');
    res.send({
      status : 200,
      data : newUser
    })
  }catch(error){
    next(error);
  }
});

router.post(
  '/signup',
  validateBody,
  passport.authenticate('local-signup', { session: false }),
  getToken
)
router.post(
  '/signin',
  validateBody,
  passport.authenticate('local-signin', { session: false }),
  getToken
)

router.get('/users', async(req, res, next) => {
  try{
      const users =  await User.find({});
      res.send({
          status : 200,
          data : users
      });
  }catch(error){
      next(error);
  }
  
});
router.delete('/users', async(req, res, next) => {
  try{
      const users =  await User.remove({});
      res.send({
          status : 200,
          data : users
      });
  }catch(error){
      next(error);
  }
  
});

export default router;