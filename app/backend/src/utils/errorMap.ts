const errorMap: Record<string, number> = {
  invalidValue: 422,
  badRequest: 400,
  unauthorized: 401,
  teamNotFound: 404,
};

const mapError = (type: string): number => errorMap[type] || 500;

export {
  errorMap,
  mapError,
};
