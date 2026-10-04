import Joi from 'joi'

class LoginDTO extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().trim().email().max(255).lowercase().required(),
        password: Joi.string().min(8).required()
    })
}

export default LoginDTO;