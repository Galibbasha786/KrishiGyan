// middleware/authMiddleware.js - UPDATED
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Make sure we have the right structure
    req.user = {
      userId: decoded.userId || decoded.id, // Support both for now
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};