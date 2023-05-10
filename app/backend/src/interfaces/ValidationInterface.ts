interface ValidationSuccess {
  type: null;
  message: string;
}

interface ValidationError {
  type: string;
  message: string;
}

export { ValidationSuccess, ValidationError };
