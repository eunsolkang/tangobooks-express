import mongoose, { Schema } from "mongoose";

export interface PublisherModel extends mongoose.Document {
    author : string;
    address : string;
    page : string;
    name : string;
    rank : string;
    phone : string;
    email : string;
}
const PublisherSchema: Schema<PublisherModel> = new Schema({
    author : { type: String },
    address : { type: String },
    page : { type: String },
    name : { type: String },
    rank : { type: String },
    phone : { type: String },
    email : { type: String },
},{ timestamps: true } );

export default  mongoose.model('publisher', PublisherSchema);