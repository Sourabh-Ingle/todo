import Joi from 'joi';

class ForgetPasswordDTO extends BaseDTO{
    static schema = Joi.object({
        emial:Joi.string().trim().email().max(255).lowercase().required(),
    })
}

export default ForgetPasswordDTO;