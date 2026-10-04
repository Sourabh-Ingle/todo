import Joi from 'joi';

class ResetPassword extends BaseDTO{
    static schema = Joi.object({
        password: Joi.string().required().min(8)
    })
}

export default ResetPassword;