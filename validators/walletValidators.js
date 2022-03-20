const Joi = require("joi")

const getSingleWallet = Joi.object({
    walletId : Joi.string().required()
})

const creditWallet = Joi.object({
    walletId : Joi.string().required(),
    amount : Joi.number().min(100)
})

const debitWallet = Joi.object({
    walletId : Joi.string().required(),
    amount : Joi.number().min(100)
})

module.exports = {
    getSingleWallet,
    creditWallet, 
    debitWallet
}