import Joi from 'joi';

export default Joi.object({
    phone: Joi.string()
            .pattern(/^9989[0123456789][0-9]{7}$/)
            .required()
            .error(Error("Phone number is invalid"))
})