require('dotenv').config({path:'./.env'});
const {connect} = require('mongoose')

const URI=`mongodb+srv://juanespasan:${process.env.mongo_pass}@mitinerary.bajxpii.mongodb.net/?retryWrites=true&w=majority`;
const connectDb = ()=>connect(URI)
.then(() => { console.log('Connected to database')})
.catch((e)=>{console.log(`Error connecting: ${e}`)})

connectDb()