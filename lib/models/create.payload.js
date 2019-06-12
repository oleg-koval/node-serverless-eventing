const Joi = require('joi')

const schema = Joi.object().keys({
    amount: Joi.number()
        .integer()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER)
        .required(),
    companyId: Joi.string().required(),
})

const validate = payload => Joi.validate(payload, schema, { abortEarly: false })

module.exports = {
    validate,
}
