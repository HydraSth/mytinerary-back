const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
    name:{
        tpye:String,
        required:true
    }, 
    lastName:{
       tpye: String,
       required:true
    }, 
    age:{
       tpye: number,
       required:true
    },
    wish_list:{
       tpye: Types.ObjectId,
       ref:"City"
    } 
})

