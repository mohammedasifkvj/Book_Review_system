import jwt from 'jsonwebtoken';
import User from '../../domain/models/user.model.js';
import { generateAccessToken } from '../../utils/token.utils.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify access token
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (!err && decoded) {
      // Access token valid
      const user=await User.findById(decoded.id);
      req.user = user
      return next();
    }

    // Access token expired?
    if (err && err.message === 'jwt expired') {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing. Please login again.' });
      }

      // Verify refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (refreshErr, refreshDecoded) => {
        if (refreshErr || !refreshDecoded) {
          return res.status(403).json({ message: 'Refresh token invalid or expired. Please login again.' });
        }

        // Refresh token is valid — issue new access token
        const user = await User.findById(refreshDecoded.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        
        const newAccessToken = generateAccessToken(user._id);

        // Send the new access token as Bearer token in Auth header
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);

        return next()
      });

    } else {
      // Some other error with access token
      return res.status(403).json({ message: 'Invalid access token from else' });
    }
  });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};