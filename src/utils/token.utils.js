import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = process.env;

// Generate a short-lived access token.

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });

//  Generate a long-lived refresh token with a unique JTI.
 
export const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId, jti: uuidv4() }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  // Verify a refresh token and return its decoded payload.
 
export const verifyRefreshToken = (token) =>
  jwt.verify(token, JWT_REFRESH_SECRET);
