import User, { UserModel } from '../models/User'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'user_id',
            passwordField: 'user_pw',
            passReqToCallback: false,
            session: false,
        },
        async ( user_id: string , user_pw : string,  next: any) => {
            try{
                
                const user = await User.findOne({ user_id })
                if (user) {
                    // next 함수는 첫 인자로 에러, 두 번째 인자로 유저를 받습니다.
                    console.log('user exists!');
                    
                    return next('user exists!', false)
                }
                let newUser = new User() as UserModel;
                newUser.user_id = user_id;
                newUser.user_pw = newUser.generateHash(user_pw);

                newUser.save();
                
                return next(null, newUser.toObject());
            }catch(error){
                next(error);
            }

        }
    )
);
