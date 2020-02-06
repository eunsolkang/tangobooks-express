import mongoose, { Schema } from "mongoose";
import { PublisherModel } from './Publisher'

export interface BookModel extends mongoose.Document {
    name : string;
    hash : string;
    active : boolean;
    publisher : PublisherModel
    codes : [{
        code : string;
        url : string;
        active : boolean;
        price : number;
    }]
}
const BookSchema: Schema<BookModel> = new Schema({
    name : { type: String, required : true },
    hash : { type: String },
    active : { type : Boolean, default : true},
    publisher : { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required : true },
    codes : [{
        code : { type: String },
        url : { type: String },
        active : { type : Boolean, default : true },
        price : {type : Number, default : 0}
    }]
},{ timestamps: true } );

export default  mongoose.model('book', BookSchema);