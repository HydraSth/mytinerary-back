const Bcrypt=require('bcrypt')

const HashPassword= async(req,res,next)=>{
    try{
        const {password}=req.body
        const salt=await Bcrypt.genSalt(10)
        const hash=await Bcrypt.hash(password, salt)
        req.body.password=hash
        next()
    }catch{
        res.status(500).json({
            message:e.message
        })
    }
}

const VerifyPassword = (passwordPlain, HashPassword) => {
    return Bcrypt.compareSync(passwordPlain, HashPassword);
}


module.exports={
    HashPassword,
    VerifyPassword
}