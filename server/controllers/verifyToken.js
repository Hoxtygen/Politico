import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../database/dbConfig';

dotenv.config();

const verify = {
  verifyLoggedIn(req, res, next) {
    const token = req.headers['api-access-token'];
    if (!token) {
      res.status(400).json({
        status: 400,
        message: 'Access denied, you must be logged in to access this resource',
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

  verifyAdmin(req, res, next) {
    const token = req.headers['api-access-token'];
    if (!token) {
      res.status(401).json({
        status: 401,
        message: 'Access denied, you must be logged in to access this resource',
      });
    }
    /* if (!req.decoded) {
      res.status(400).json({
        status: 400,
        error: 'Internal server error',
      });
    } */
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      req.decoded = decoded;
      if (decoded.payload.isadmin === false) {
        return res.status(403).json({
          status: 403,
          error: 'Access Forbidden',
        });
      }
      next();
    });
  },
};


export default verify;
