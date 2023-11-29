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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3-1XF5URp5RtziduOmtuTd&ust=1701345151774000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCMiwo-WS6YIDFQAAAAAdAAAAABAE"
    },

}, 
{timestamps:true}
);
const User = mongoose.model('User', userSchema);
export default User;