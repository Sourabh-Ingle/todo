import Joi from Joi;

class BaseDTO {

    static schema = Joi.object({});

    static validate(data) {
        const { error, value } = schema.validate(data,{
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errors = error.details.map(d => d.message);
            return { error: errors, value: null }
        }
        return {value,error:null}
    }
}

export default BaseDTO;