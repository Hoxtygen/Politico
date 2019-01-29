import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/dbConfig';
dotenv.config();

const verify = {
  verifyToken(req, res, next) {
    const token = req.headers['api-access-token'];
    if (!token) {
      res.status(400).json({
        status: 400,
        message: 'Access denied',
      });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(403).json({
            status: 403,
            error: 'Invalid token',
          });
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    }
  },
};
export default verify;
