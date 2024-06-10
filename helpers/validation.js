const joi = require('joi');

const userValidate = data => {
    const userSchema = joi.object({
        email: joi.string().pattern(RegExp('gmail.com')).email().lowercase().required(),
        password: joi.string().min(6).max(32).required(),
        fullName: joi.string(),
        role: joi.string()
    })
    return userSchema.validate(data)
}

module.exports = {
    userValidate
}