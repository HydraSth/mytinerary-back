const {Schema, model} = require('mongoose')

const activitySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
       type: String,
       required:true
    },
    itinerary:{
        type: Schema.Types.ObjectId,
        ref:'Intinerary'
    }
})

const instance_activity = model('Activity', activitySchema)

module.exports = instance_activity