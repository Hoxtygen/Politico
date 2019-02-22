/* eslint-disable camelcase */
import encrypt from './encrypt';
import validations from '../helper/validateLogin';
import dbConfig from '../database/dbConfig';

class UserController {
  static getAllUsers(req, res) {
    dbConfig.query('SELECT * FROM politico_andela.users')
      .then((users) => {
        res.status(200).json({
          status: 200,
          data: users.rows,
        });
      });
  }

  static login(req, res) {
    const { email, password } = req.body;
    const errors = validations.validateLogin(req.body);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }
    dbConfig.query('SELECT * FROM politico_andela.users WHERE email = $1', [email])
      .then((user) => {
        if (!user.rows[0]) {
          return res.status(401).json({
            status: 401,
            error: 'Invalid email supplied',
          });
        }

        if (!encrypt.compare(user.rows[0].password, password)) {
          return res.status(400).json({
            status: 400,
            error: 'Invalid email or password',
          });
        }
        const data = {
          id: user.rows[0].id,
          is_admin: user.rows[0].is_admin,
        };
        const token = encrypt.createToken(data);
        console.log(user.rows);
        return res.status(200).json({
          status: 200,
          data: [
            {
              token,
              user: {
                id: user.rows[0].id,
                first_Name: user.rows[0].first_name,
                last_Name: user.rows[0].last_name,
                email: user.rows[0].email,
                other_Name: user.rows[0].other_name,
                phone_Number: user.rows[0].phone_number,
                passport_Url: user.rows[0].passport_url,
                is_admin: user.rows[0].is_admin,
              },
            },
          ],
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          error: err.message,
        });
      });
  }


  static addNewUser(req, res) {
    let {
      first_Name, last_Name, other_Name, email, phone_Number, passport_Url, password,
    } = req.body;
    const errors = validations.validateNewUser(req.body);
    if (errors.error) {
      return res.status(400).json({
        status: 400,
        error: errors.error.details[0].message,
      });
    }
    password = encrypt.encryptPwd(password);
    const newUser = {
      first_Name,
      last_Name,
      other_Name,
      email,
      phone_Number,
      passport_Url,
      password,
    };
    dbConfig.query('INSERT INTO politico_andela.users (first_Name, last_Name, other_Name, email, phone_Number, passport_Url, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [first_Name, last_Name, other_Name, email, phone_Number, passport_Url, password])
      .then((user) => {
        if (user.rowCount > 0) {
          const data = {
            id: user.rows[0].id,
            is_admin: user.rows[0].is_admin,
          };

          const token = encrypt.createToken(data);
          res.status(201).json({
            status: 201,
            data: [
              {
                token,
                user: {
                  id: user.rows[0].id,
                  first_Name: user.rows[0].first_name,
                  last_Name: user.rows[0].last_name,
                  email: user.rows[0].email,
                  other_Name: user.rows[0].other_name,
                  phone_Number: user.rows[0].phone_number,
                  passport_Url: user.rows[0].passport_url,
                },
              },
            ],
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'User could not be added',
          });
        }
      })
      .catch((err) => {
        if (err.message.includes('unique')) {
          res.status(409).json({
            status: 409,
            error: 'User with that email already exist',
          });
        }
      });
  }
}

export default UserController;
