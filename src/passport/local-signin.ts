import User, { UserModel } from '../models/User'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request } from 'express';

passport.use(
    'local-signin',
    new LocalStrategy(
        {
            usernameField : 'user_id',
            passwordField : 'user_pw',
            passReqToCallback : true,
            session : false
        },
        async( req : Request, user_id : string, user_pw : string, next : any) => {
            try{
                const user = await User.findOne({user_id : user_id}) as UserModel;
                if ( user ){
                    const isValidPassword = user.validatePassword(user_pw);
                    return isValidPassword ? 
                            next(null, user.toObject()) :
                            next('wrong password', false)
                }
                next('wrong user_id', false);
            }catch(error){
                next(error);
            }
        },
    )
);