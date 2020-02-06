import express from "express";
import passport from 'passport'
import { getToken } from '../../modules/getToken';
import User from '../../models/User'

const router = express.Router();

router.get('/kakao', passport.authenticate("kakao-login"));
router.get(
    "/kakao/callback",
    passport.authenticate("kakao-login", {
      successRedirect: "localhost:8080/main",
      failureRedirect: "/v1/auth/fail",
      session: false
    }), getToken
);

router.get('/me', async(req, res) => {
  
});

export default router;