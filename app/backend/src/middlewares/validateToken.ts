import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/auth';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const infoToken = validateToken(authorization);

    req.body.infoToken = infoToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
