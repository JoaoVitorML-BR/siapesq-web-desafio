import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IJwtUserPayload } from '../interface/user.interface';

export const AuthGetData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(401).json({ error: 'Token not provided' });
      return;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      res.status(401).json({ error: 'Malformed token' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtUserPayload;

    res.locals.user = decoded;

    next();
  } catch (error) {
    console.error('Authentication error:', error);

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    res.status(500).json({ error: 'Authentication failed' });
  }
}
