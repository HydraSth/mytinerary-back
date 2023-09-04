const Intinerary= require("../models/intinerary")
const City= require("../models/city")

const Verification= async (req,res,next) => {
    let {location,name,photo, author, price, duration, likes, hashtags}=req.body

    if(!location || !name || !photo || !author || !price || !duration || !likes || !hashtags){
        return res.status(400).json({
            message:"All fields are required"
        })
    }else if(await Intinerary.find({name:name})!=0){
        return res.status(400).json({
            message:"Name already exists",
        })
    }else if(price<=0){
        return res.status(400).json({
            message:"Price must be greater than 0"
        })
    }else if(duration<=0){
        return res.status(400).json({
            message:"Duration must be greater than 0"
        })
    }else if((await City.find({name:location}))==0){
        return res.status(400).json({
            message:"City not found"
        })
    }
    next();
}


module.exports={
    Verification
}