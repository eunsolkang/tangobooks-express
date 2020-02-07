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
},passport.authenticate("kakao-login"));
router.get(
    "/kakao/callback",
    passport.authenticate("kakao-login", {
      failureRedirect: "/v1/auth/fail",
      session: false
    }), async(req, res, next) => {
      res.redirect(`http://localhost:8080/`);
    }
);

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