const {Schema, model} = require('mongoose')

const intSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:1
    },
    duration:{
        type:Number,
        required:true
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    hashtags:{
        type:String,
        required:true
    },
    comments:{
        type:String,
    },
    city:{
        type:Schema.Types.ObjectId,
        ref:'City',
    },
    activities:[{
        type: Schema.Types.ObjectId,
        ref:'Activity'
    }]
})


const Intinerary = model('Intinerary', intSchema)
module.exports = Intinerary
