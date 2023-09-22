require('dotenv').config({path:'./.env'});
const Joi=require('joi');
const User= require("../models/user")
const { VerifyPassword } = require("../middlewares/encryptAuth");

const jwt = require("jsonwebtoken");
const passport=require('passport');
const {Strategy,ExtractJwt}=require('passport-jwt');

const passportVerificator=passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.KEY_JWT
    }, async (payload,done)=>{
        try{
            const user=await User.findOne({email:payload.email})
            if(user){
                    return done(null,user)
                }else{
                    return done(null)
                }
            }catch(e){
            return done(e)
        }
        }
    ),
);

const userSchema=Joi.object({
    name:Joi.string().max(25).alphanum().required().messages({
        'string.max':'Name must be less than 25 characters',
        'string.empty':'Name cannot be empty',
        'string.required':'Name is required',
        'any.required':'Name is required'
    }),
    month_birth:Joi.string().max(15).required().messages({
        'string.max':'Month birth must be less than 15 characters',
        'string.empty':'Month birth cannot be empty',
        'string.required':'Month birth is required',
        'any.required':'Month birth is required'
    }),
    year_birth:Joi.string().max(15).required().messages({
        'string.max':'Year birth must be less than 15 characters',
        'string.empty':'Year birth cannot be empty',
        'string.required':'Year birth is required',
        'any.required':'Year birth is required'
    }),
    email:Joi.string().min(10).max(30).email().required().messages({
        'string.min':'Email must be at least 10 characters',
        'string.max':'Email must be less than 30 characters',
        'string.email':'Email must be a valid direction, check it',
        'string.empty':'Email cannot be empty',
        'string.required':'Email is required',
        'any.required':'Email is required'
    }),
    password:Joi.string().min(6).required().messages({
        'string.min':'Password must be at least 6 characters',
        'string.empty':'Password cannot be empty',
        'string.required':'Password is required',
        'any.required':'Password is required'
    }),
    photo:Joi.string().allow(""),
    country:Joi.string().min(3).required().messages({
        'string.min':'Country must be at least 3 characters',
        'string.empty':'Country cannot be empty',
        'string.required':'Country is required',
        'any.required':'Country is required'
    }),
    mail_contact:Joi.boolean()
})

const verifyAuthData = (req, res, next) => {
    const Payload=req.body;
    const {error}=userSchema.validate(Payload);
    if(error){
        return res.status(400).json({
            message:error.details.map((error)=>error.message)
        })
    }
    next();
}

const userExists = async (req, res, next) => {
    const {email}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        return res.status(404).json({
            message:'User not found'
        })
    }
    req.user=user;
    next();
}

const passwordMatch = async (req, res, next) => {
    const {password} = req.body;
    const dbHashPassword = req.user.password;
    if(VerifyPassword(password,dbHashPassword)){
        req.password=password
        next();
    }else{
        res.status(400).json({
            message:"Wrong password",
        })
    }
}

const generateToken = (req, res, next) => {
    try {
        let token=jwt.sign({email:req.user.email},process.env.KEY_JWT,{expiresIn:'10h'})
        req.token=token
        next();
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    verifyAuthData,
    userExists,
    passwordMatch,
    generateToken,
    passportVerificator
}