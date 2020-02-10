import { Strategy as KakaoStrategy } from 'passport-kakao';
import User, { UserModel } from '../models/User'
import passport from 'passport';
import { getHashCode } from '../modules/getHashCode';


const kakaoKey = {
    clientID: "10eecd41090498c6670d59f7bd3ac862",
    clientSecret: "dJRxX7bigvOrwBBATVEHTvidrEDFyIlu",
    callbackURL: "http://localhost:3000/v1/auth/kakao/callback"
};  
passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, async(accessToken, refreshToken, profile, done) => {
      
      const data = {
        user_id : profile.id,
        username : profile.username
      }
      let user = await User.findOne({user_id : data.user_id});
      if ( !user ){
        try{
          console.log('New User!');
          
          let newUser = new User(data) as UserModel;
          newUser.hash = await getHashCode('user')
          await newUser.save();
        }catch(e){
          return done('error!')
        }
      }
      else {
        console.log('Old User!');
      }
      return done(null, user)
    })
);
  