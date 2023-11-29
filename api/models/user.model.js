import mongoose from "mongoose";
// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
        
    },

    password: {
        type: String,
        required: true,    
    },
    avatar: {
        type: String,
        default: "https://www.ministryofcolours.co.uk/cdn/shop/products/Bluepowder.jpg?v=1675851411&width=800"
    },
}, 
{timestamps:true}
);
const User = mongoose.model('User', userSchema);
export default User;