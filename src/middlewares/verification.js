const City= require("../models/city")
const fieldAddCity= async (req,res,next) => {
    let {country, name, photo}=req.body;
    let cities= await City.find()
    if(name){
        let city_filtered=cities.filter(city => city.name == name)
        if(city_filtered.length != 0){
            return res.status(400).json({
                message:`${name} already exists`
            })
        } 
    }else if(!country || !name || !photo){
        return res.status(400).json({
            message:"All fields are required name, photo and country"
        })
    }
    next();
}
const fieldName= (req,res,next) => {
    let {name}=req.query;
    if(!name){
        return res.status(400).json({
            message:"Name field is required"
        })
    }
    next();
}

module.exports={
    fieldAddCity,
    fieldName
}