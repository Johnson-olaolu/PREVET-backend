const Joi = require("joi")

const addVetter = Joi.object({
    firstName : Joi.string().min(3).required(),
    lastName : Joi.string().min(3).required(),
    email : Joi.string().min(3).email({ minDomainSegments: 2 }).required(),
    userName : Joi.string().min(3).max(20).required(),
    phoneNum : Joi.string().min(11).max(11).required(),
    password : Joi.string().min(6).max(50).required(),
    state: Joi.string().required(),
    localGovernment : Joi.string().required(),
    address : Joi.string().required()
})

module.exports = {
    addVetter  
}