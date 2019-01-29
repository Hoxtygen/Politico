import encrypt from './encrypt';
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
    req.checkBody('email', 'Email field is required').notEmpty().trim();
    req.checkBody('email', 'Invalid email address').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    const { email, password } = req.body;
    dbConfig.query('SELECT * FROM politico_andela.users WHERE email = $1', [email])
      .then((user) => {
        if (!user.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'Invalid credentials supplied',
          });
        }
        if (!encrypt.compare(user.rows[0].password, password)) {
          return res.status(400).json({
            status: 400,
            error: 'Invalid username or password',
          });
        }
        const token = encrypt.createToken(user.rows[0].email);
        res.status(200).json({
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
    req.checkBody('firstname', 'First name  is required').notEmpty().trim();
    req.checkBody('lastname', 'Last name is required').notEmpty().trim();
    req.checkBody('othername', 'Other name is required').notEmpty().trim();
    req.checkBody('email', 'Email is required').notEmpty().trim();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('phonenumber', 'Phone number is required').notEmpty().trim();
    req.checkBody('phonenumber', 'Phone number is required').isNumeric();
    req.checkBody('phonenumber', 'Phone must be at least 11 characters long').isLength({ min: 11, max: 20 });
    req.checkBody('passporturl').notEmpty().withMessage('Passport url is required').isURL()
      .withMessage('Invalid url');
    req.checkBody('password', 'Password field is required').notEmpty().trim().isLength({ min: 8, max: 50 })
      .withMessage('Password must be at least 8 characters long');

    const errors = req.validationErrors();
    if (errors) {
      res.status(400).json({
        status: 400,
        errors,
      });
    }
    let {
      firstname, lastname, othername, email, phonenumber, passporturl, password,
    } = req.body;
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
