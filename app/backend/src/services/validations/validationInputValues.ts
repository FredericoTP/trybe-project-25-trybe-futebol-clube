import { ValidationSuccess, ValidationError } from '../../interfaces/ValidationInterface';
import idSchema from './schemas';

const validateId = (id: number): ValidationSuccess | ValidationError => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'invalidValue', message: error.message };

  return { type: null, message: '' };
};

export default validateId;
