const Joi = require("joi")

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
    getSingleUser, 
    updateSingleUser ,
    deleteSingleUser
}