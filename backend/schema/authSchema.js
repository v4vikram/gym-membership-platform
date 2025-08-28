import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'any.required': 'Name is required',
            'string.min': 'Atleast {#limit} characters',
            'string.max': 'Exceed {#limit} characters',
        }),

    email: Joi.string()
        .email()
        .trim()
        .required()
        .empty('')
        .messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Not Valid Email',
        }),

    password: Joi.string()
        .trim()
        .min(5)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
            'string.min': 'Atleast {#limit} characters',
            'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
        }),
});





