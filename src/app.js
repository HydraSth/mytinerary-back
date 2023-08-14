const express = require('express')
const router = require('./router/router')

const app = express()
app.use("/api", router)
app.listen(3000, () => {
    console.log('Listening on port 3000');
})



