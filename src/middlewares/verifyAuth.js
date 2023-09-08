const Joi=require('joi');

const userSchema=Joi.object({
    name:Joi.string().max(15).required().messages({
        'string.max':'Name must be less than 15 characters',
        'string.empty':'Name cannot be empty',
        'string.required':'Name is required',
        'any.required':'Name is required'
    }),
    lastName:Joi.string().max(15).required().messages({
        'string.max':'Last name must be less than 15 characters',
        'string.empty':'Last name cannot be empty',
        'string.required':'Last name is required',
        'any.required':'Last name is required'
    }),
    email:Joi.string().min(10).max(30).email().required().messages({
        'string.min':'Email must be at least 10 characters',
        'string.max':'Email must be less than 30 characters',
        'string.email':'Email must be a valid direction, check it',
        'string.empty':'Email cannot be empty',
        'string.required':'Email is required',
        'any.required':'Email is required'
    }),
    password:Joi.string().min(6).required().messages({
        'string.min':'Password must be at least 6 characters',
        'string.empty':'Password cannot be empty',
        'string.required':'Password is required',
        'any.required':'Password is required'
    }),
    photo:Joi.string().uri().required().messages({
        'string.empty':'Photo cannot be empty',
        'string.uri':'Photo must be a valid url',
        'string.required':'Photo is required',
        'any.required':'Photo is required'
    }),
    country:Joi.string().min(3).required().messages({
        'string.min':'Country must be at least 3 characters',
        'string.empty':'Country cannot be empty',
        'string.required':'Country is required',
        'any.required':'Country is required'
    })
})

const verifyAuthData = (req, res, next) => {
    const Payload=req.body;
    const {error}=userSchema.validate(Payload);
    if(error){
        return res.status(400).json({
            message:error.details.map((error)=>error.message)
        })
    }
    next();
}

module.exports = {
    verifyAuthData
}