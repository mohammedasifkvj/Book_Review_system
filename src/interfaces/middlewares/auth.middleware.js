import jwt from 'jsonwebtoken';
import User from '../../domain/models/user.model.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token,process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        if(err.message==="jwt expired")
          return res.status(401).json({ message:err.message })
      }

      req.user = await User.findById(decoded.id);
      next();
  });
  } catch (err) {
    return res.status(403).json({ message: 'Internal server error from middleware' });
  }
};