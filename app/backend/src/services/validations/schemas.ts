import Joi = require('joi');
import { NumberSchema } from 'joi';

const idSchema: NumberSchema = Joi.number().min(1).integer().required();

export default idSchema;
