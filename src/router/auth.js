const express = require('express')
const {register,login,authenticate} = require('../controllers/loginController')

const authRouter = express.Router()
const {verifyAuthData,userExists,generateToken,passwordMatch,passportVerificator} = require('../middlewares/verifyAuth')
const {HashPassword} = require('../middlewares/encryptAuth')

authRouter.post('/signUp',verifyAuthData,HashPassword,register)
authRouter.post('/signIn',userExists,passwordMatch,generateToken,login)
authRouter.post('/authenticate',passportVerificator.authenticate("jwt",{session:false}),generateToken,authenticate)

module.exports = authRouter;