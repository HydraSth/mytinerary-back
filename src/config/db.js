require('dotenv').config({path:'./.env'});
const {connect} = require('mongoose')

const URI=process.env.MONGODB_URI;
const connectDb = ()=>connect(URI)
.then(() => { console.log('Connected to database')})
.catch((e)=>{console.log(`Error connecting: ${e}`)})

connectDb()