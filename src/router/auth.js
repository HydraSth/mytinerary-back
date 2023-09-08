const express = require('express')
const {register,login} = require('../controllers/loginController')

const authRouter = express.Router()
const {verifyAuthData} = require('../middlewares/verifyAuth')
const {HashPassword} = require('../middlewares/encryptAuth')

authRouter.post('/signUp',verifyAuthData,HashPassword,register)
authRouter.post('/signIn',login)

module.exports = authRouter;