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
          return res.status(400).json({
            status: 400,
            error: 'Invalid email supplied',
          });
        }

        if (!encrypt.compare(user.rows[0].password, password)) {
          return res.status(400).json({
            status: 400,
            error: 'Invalid username or password',
          });
        }
        const token = encrypt.createToken(user.rows[0].email);
        return res.status(200).json({
          token,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: err.message,
        });
      });
  }


  static addNewUser(req, res) {
    let {
      firstname, lastname, othername, email, phonenumber, passporturl, password,
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
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      passporturl,
      password,
    };
    dbConfig.query('INSERT INTO politico_andela.users (firstname, lastname, othername, email, phonenumber, passporturl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [firstname, lastname, othername, email, phonenumber, passporturl, password])
      .then((user) => {
        if (user.rowCount > 0) {
          res.status(201).json({
            status: 201,
            data: user.rows,
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
          res.status(400).json({
            status: 400,
            error: 'User with that email already exist',
          });
        }
      });
  }
}

export default UserController;
