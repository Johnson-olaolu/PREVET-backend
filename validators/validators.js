const Joi = require("joi");

const register = Joi.object({
    firstName : Joi.string().min(3).required(),
    lastName : Joi.string().min(3).required(),
    email : Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
    userName : Joi.string().min(3).max(20).required(),
    phoneNum : Joi.string().min(11).max(11).required(),
    password : Joi.string().min(6).max(50).required(),
    address : Joi.string().required()
})

const getVerificationToken = Joi.object({
    userId : Joi.string().required()
})

const verifyToken = Joi.object({
    token : Joi.string().length(5).required(),
    email : Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
})

const login = Joi.object({
    userName : Joi.string().min(3).max(20).required(),
    password : Joi.string().min(6).max(50).required(),
})

const getChangePasswordLink = Joi.object({
    userId : Joi.string().required()
})

const resetPassword = Joi.object({
    userId : Joi.string().required(),
    token : Joi.string().length(5).required(),  
    password : Joi.string().min(6).max(50).required(),
})

const getSingleUser = Joi.object({
    userId : Joi.string().required()
})

const updateSingleUser = Joi.object({
    firstName : Joi.string().min(3),
    lastName : Joi.string().min(3),
    phoneNum : Joi.string().min(11).max(11),
    address : Joi.string()
})

const deleteSingleUser = Joi.object({
    userId : Joi.string().required()
})

module.exports = {
    register,
    getVerificationToken,
    verifyToken,
    getChangePasswordLink,
    resetPassword,
    login,
    getSingleUser, 
    updateSingleUser ,
    deleteSingleUser
}