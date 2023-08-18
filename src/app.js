const express = require('express')
const router = require('./router/router')
const cors = require('cors')
require("./config/db")

const app = express()
app.use(cors())

app.use(express.json())

const PORT = 3000
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/api/endpoint`);
})



