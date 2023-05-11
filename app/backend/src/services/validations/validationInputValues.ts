import UserLogin from '../../interfaces/UserInterface';
import Goals from '../../interfaces/MatchInterface';
import { ValidationSuccess, ValidationError } from '../../interfaces/ValidationInterface';
import { idSchema, emailSchema, loginSchema, updateGoalSchema } from './schemas';

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

  if (error) return { type: 'unauthorized', message: 'Invalid email or password' };

  return { type: null, message: '' };
};

const validateGoalsFields = (goal: Goals): ValidationSuccess | ValidationError => {
  const { error } = updateGoalSchema.validate(goal);

  if (error) return { type: 'invalidValue', message: error.message };

  return { type: null, message: '' };
};

export { validateId, validateEmail, validateLoginFields, validateGoalsFields };
