const {Schema, model} = require('mongoose')

const citiesSchema = new Schema({
    country:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }, 
    photo:{
       type: String,
       required:true
    }, 
    rating:{
       type: String,
       required:true
    }, 
    description:{
       type: String,
       required:true
    } 
})

const City = model('City', citiesSchema)

module.exports = City