import express from "express";
import passport from 'passport'
import { getToken } from '../../modules/getToken';
import User from '../../models/User';
import { validateBody } from '../../modules/validateBody';

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
      failureRedirect: "http://localhost:8080/login",
      session: true
    }), async(req :any, res, next) => {
      if ( req.user.done ) {
        req.session.save(function(){
          res.redirect('http://localhost:8080/')
        });
      }
      else {
        req.session.save(function(){
          res.redirect(`http://localhost:8080/register?code=${req.user.hash}`)
        });
      }
        
      
      
    }
);

router.get('/me', async(req : any, res, next)=>{
  if (req.isAuthenticated()) {
    res.send({
      data : req.user
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
  const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set : req.body}
  );
  res.send({ success: true, data: user });
})

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
router.post(
  '/private',
  passport.authenticate('jwt', {session : false}),
  (req, res, next) => {
      res.send({
          status : 200,
          data : req.user
      })
  }
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