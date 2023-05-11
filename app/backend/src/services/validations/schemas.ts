import Joi = require('joi');
import { NumberSchema, StringSchema } from 'joi';

const idSchema: NumberSchema = Joi.number().min(1).integer().required();

const emailSchema: StringSchema = Joi.string().email().required();

const passwordSchema: StringSchema = Joi.string().min(7).required();

const goalSchema: NumberSchema = Joi.number().min(0).integer().required();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const updateGoalSchema = Joi.object({
  homeTeamGoals: goalSchema,
  awayTeamGoals: goalSchema,
});

export { idSchema, emailSchema, loginSchema, updateGoalSchema };
