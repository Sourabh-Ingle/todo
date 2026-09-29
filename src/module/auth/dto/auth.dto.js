import Joi from 'joi'

class AuthDTO extends BaseDTO{
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().email().max(255).lowercase().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string().valid("admin", "user").default('user')
    })
}

export default AuthDTO;