import mongoose, { Schema } from "mongoose";

export interface UserModel extends mongoose.Document {
    user_id : number
    username : string,
    library : [String],
    coin : number
}
const UserSchema: Schema<UserModel> = new Schema({
    user_id : {type : String},
    username : { type: String },
    library : [{ type: String }],
    coin : { type: Number, default : 0 },

},{ timestamps: true } );

export default  mongoose.model('user', UserSchema);