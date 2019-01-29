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


  static addNewUser(req, res) {
    console.log(req.body);
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
      console.log(errors);
      res.status(400).json({
        status: 400,
        errors,
      });
    }
    let {
      firstname, lastname, othername, email, phonenumber, passporturl, password,
    } = req.body;
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
