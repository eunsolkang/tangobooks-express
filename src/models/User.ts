import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface UserModel extends mongoose.Document {
    user_id : string;
    user_pw : string;
    library? : [string];
    coin? : number;
    generateHash : (user_pw: string) => string;
    validatePassword : (user_pw: string) => boolean;
}
const UserSchema: Schema<UserModel> = new Schema({
    user_id : {type : String},
    user_pw : {type : String},
    library : [{ type: String }],
    coin : { type: Number, default : 0 },
},{ timestamps: true } );


UserSchema.methods.generateHash = function(user_pw: string): string {
    return bcrypt.hashSync(user_pw, bcrypt.genSaltSync(16))
  }
  
  UserSchema.methods.validatePassword = function(user_pw: string): boolean {
    return bcrypt.compareSync(user_pw, this.user_pw)
  }

export default  mongoose.model('user', UserSchema);