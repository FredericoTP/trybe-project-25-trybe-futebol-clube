import Joi = require('joi');
import { NumberSchema, StringSchema } from 'joi';

const idSchema: NumberSchema = Joi.number().min(1).integer().required();

const emailSchema: StringSchema = Joi.string().email().required();

const passwordSchema: StringSchema = Joi.string().min(7).required();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export { idSchema, emailSchema, loginSchema };
