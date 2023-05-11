import UserLogin from '../../interfaces/UserInterface';
import { ValidationSuccess, ValidationError } from '../../interfaces/ValidationInterface';
import { idSchema, emailSchema, loginSchema } from './schemas';

const validateId = (id: number): ValidationSuccess | ValidationError => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'invalidValue', message: error.message };

  return { type: null, message: '' };
};

const validateEmail = (email: string): ValidationSuccess | ValidationError => {
  const { error } = emailSchema.validate(email);

  if (error) return { type: 'invalidValue', message: error.message };

  return { type: null, message: '' };
};

const validateLoginFields = (userInfo: UserLogin): ValidationSuccess | ValidationError => {
  const { error } = loginSchema.validate(userInfo);

  if (error) return { type: 'invalidValue', message: error.message };

  return { type: null, message: '' };
};

export { validateId, validateEmail, validateLoginFields };
