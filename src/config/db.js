const {connect} = require('mongoose')

const pass='oxa6VBAY3ZKyOjfe';
const URI=`mongodb+srv://juanespasan:${pass}@mitinerary.bajxpii.mongodb.net/?retryWrites=true&w=majority`;
const connectDb = ()=>connect(URI)
.then(() => { console.log('Connected to database')})
.catch((e)=>{console.log(`Error connecting: ${e}`)})

connectDb()