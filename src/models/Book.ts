import mongoose, { Schema } from "mongoose";
import { UserModel } from './User'

export interface BookModel extends mongoose.Document {
    name : string;
    hash : string;
    active : boolean;
    codes : [{
        code : string;
        url : string;
        active : boolean;
        price : number;
    }];
    user: [UserModel]
}
const BookSchema: Schema<BookModel> = new Schema({
    name : { type: String, required : true },
    hash : { type: String },
    active : { type : Boolean, default : true},
    user : [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required : true }],
    codes : [{
        code : { type: String },
        url : { type: String },
        active : { type : Boolean, default : true },
        price : {type : Number, default : 0}
    }]
},{ timestamps: true } );

export default  mongoose.model('book', BookSchema);