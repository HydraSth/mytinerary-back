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
    },
    itineraries:[{
        type: Schema.Types.ObjectId,
        ref:'Intinerary'
    }]
})

const instance_city = model('City', citiesSchema)

module.exports = instance_city