
const User= require("../models/user")

const register=async (req,res) => {
    try{
        const payload = req.body;
        const userExists = await User.findOne({email:payload.email})
        if(userExists){
            return res.status(409).json({
                message:"User already exists"
            })
        }
        const user = new User(payload)
        await user.save()
        res.status(201).json({
            message:"User created",
            user:user
        })
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

const login=async (req,res) => {
    res.status(200).json({
        user:{
            email:req.user.email,
            id:req.user._id
        },
        token:req.token
    })
}

const authenticate=async (req,res) => {
    res.status(200).json({
        message:"User authenticated",
        user:{
            email:req.user.email,
            id:req.user._id
        },
        token:req.token
    })
}

module.exports={
    register,
    login,
    authenticate
}
