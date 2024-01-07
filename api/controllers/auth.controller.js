import User from '../models/user.model.js'; // user model imported
import bcryptjs from 'bcryptjs';// for password hashing
import { errorHandler } from '../utils/error.js';// custom error handling function
import jwt from 'jsonwebtoken';// to create and verify JWTs

export const signup= async (req,res,next) => {// function for signup
    const{username, email, password} = req.body;// extract username etc from request body
    const hashedPassword = bcryptjs.hashSync(password,10);// hash pswd with a cost factor of 10
    const newUser=new User({username, email, password:hashedPassword});// create newuser instance 
    try {
        await newUser.save();// save newuser to database
        res.status(201).json("User created successfully");// respond with success message/http status 201
} catch(error) {// forward any errors to the next middleware
    next(error);
}
};

export const signin = async(req,res,next)=> {// function to handle a users signin
    const {email, password} =req.body; // get the suers email and password
    try {
        const validUser =  await User.findOne({email});// find the users details from the user database
        if (!validUser) return next(errorHandler(404, 'User not found!'));// if not found return 404
        const validPassword = bcryptjs.compareSync(password, validUser.password);//compare password to hashed password in db
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));// if password is not found return 401
        const token =jwt.sign({id: validUser._id}, process.env.JWT_SECRET);//generate a JWT token for authenticated user
        const {password: pass, ...rest} =validUser._doc;// extract and exclude password from user document
        res.cookie('access_token', token, {httpOnly: true})// set token in a secure HTTP-only cookie and respond with user information
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);// forward any errors to next middleware
    }
};


export const google = async(req, res, next) =>{// function to handle user authentication via Google sign-in
    try{
        const user = await User.findOne({email: req.body.email});// find user with provided email
            if(user) {// where user is found 
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); //generate  JWT token for authenticated user
                const {password: pass, ...rest}= user._doc;// extract and exclude the password from the user document
                res
                .cookie('access_token', token, {httpOnly: true}) // set token in a secure HTTP-only cookie and respond with user information
                .status(200)
                .json(rest);
            } else {// generate random password for a new user
                const generatedPassword = 
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);// hash the password
            const newUser = new User({// create a new user instance
                username:
                req.body.name.split(' ').join('').toLowerCase()+
                Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();// save new user to db
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);// generate a JWT token for the new user
            const {password: pass,  ...rest} = newUser._doc;// extract and exclude the pswd from the user document
            res
            .cookie('access_token', token, {httpOnly: true})// set the token in a secure HTTP-only cookie and respond with information
            .status(200)
            .json(rest);
            }
    }catch (error) {// forward any errors to the next middleware
        next(error);
    }
};

export const signOut = async(req, res, next) => {// function to handle user sign out
    try {
        res.clearCookie('access_token');// clear the access token cookie for user sign out
        res.status(200).json('User has been logged out');// respond with a success message and HTTP status 200
    } catch (error) {// forward any error to the next middleware
        next(error);
    }
};
