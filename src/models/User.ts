import mongoose, { Schema } from "mongoose";
import { BookModel } from './Book'
import bcrypt from 'bcrypt';
import timestamp from 'mongoose-timestamp'

export interface UserModel extends mongoose.Document {
    user_id : string;
    user_pw? : string;
    library? : BookModel[];
    coin? : number;
    experience : number;
    username :string;
    temp : boolean;
    hash : string ;
    refund : boolean;
    refundDate : string;
    admin : boolean,
    done : false,
    
}
const UserSchema: Schema<UserModel> = new Schema({
    user_id : {type : String},
    user_pw : {type : String},
    admin : {type : Boolean, default : false},
    temp : {type : Boolean, default : true},
    username : {type : String},
    hash : {type : String},
    refund : {type : Boolean, default : false},
    refundDate : {type : String},
    library : [{ type: mongoose.Schema.Types.ObjectId, ref: 'book' }],
    experience : { type: Number, default : 100 },
    coin : { type: Number, default : 0 },
    done : {type : Boolean, default : false}
});

UserSchema.plugin(timestamp)

export default  mongoose.model('user', UserSchema);