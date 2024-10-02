import mongoose, { Document, model, Schema } from "mongoose";



export interface Product extends Document{
    productname: string,
    category: string,
    description: string,
    color: string,
    price: number,
    available: boolean,
    imageUrl: string[]
}


export const productSchema: Schema<Product> = new Schema({
    productname: {
        type: String,
        required: [true,"Product Name is required"],
        unique: true
    },
    category:{
        type: String,
        required: [true,"Product Category is required"],
    },
    description:{
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: [true,"Product price is required"]
    },
    available: {
        type: Boolean,
        required: true
    },
    imageUrl: []
},{timestamps: true});



const ProductModel =( mongoose.models.product as mongoose.Model<Product> )|| model<Product>('product',productSchema)

export default ProductModel;