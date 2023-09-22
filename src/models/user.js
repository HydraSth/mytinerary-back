const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    month_birth:{
        type:String,
        required:true
    },
    year_birth:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
    },
    country:{
        type:String,
        required:true
    },
    mail_contact:{
        type:Boolean
    }
})


const User = model('User', userSchema)
module.exports = User
