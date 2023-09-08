const { VerifyPassword } = require("../middlewares/encryptAuth");
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
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if(user){
            if(VerifyPassword(password,user.password)){
                res.status(200).json({
                    message:"User logged in",
                    user:user
                })
            }else{
                res.status(400).json({
                    message:"Wrong password",
                })
            }
        }else{
            res.status(403).json({
                message:"Check email"
            })
        }
    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports={register,login}
