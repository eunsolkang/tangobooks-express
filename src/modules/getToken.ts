import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { generateToken } from './generateToken';

export const getToken = async(req : Request, res : Response, next) => {
    const user = req.user as UserModel;
    delete user.user_pw;
    console.log(user);
    
    const payload = user;

    try{
        const token = await generateToken(payload);
        
        return res.json({
            token
        })
    }catch(error){
        next(error);
    }
}