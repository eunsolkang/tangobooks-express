import { Strategy as KakaoStrategy } from 'passport-kakao';
import User from '../models/User'
import passport from 'passport';


const kakaoKey = {
    clientID: "10eecd41090498c6670d59f7bd3ac862",
    clientSecret: "dJRxX7bigvOrwBBATVEHTvidrEDFyIlu",
    callbackURL: "http://localhost:3000/v1/auth/kakao/callback"
};  
passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, async(accessToken, refreshToken, profile, done) => {
      
      const data = {
        user_id : profile.id
      }
      const user = await User.findOne({user_id : data.user_id});
      if ( !user ){
        try{
          await new User(data).save();
          console.log('new user!');
          
        }catch(e){
          done('error!')
        }
      }
      else {
        console.log('Old User!');
      }
      return done(null, profile)
    })
);
  