import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// utility funtion for creating token
export const createToken = (
  jwtPayload: { userId: Types.ObjectId; email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
