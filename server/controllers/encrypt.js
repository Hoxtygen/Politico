import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const encrypt = {
  encryptPwd(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(14));
  },
  compare(encryptPwd, password) {
    return bcrypt.compareSync(password, encryptPwd);
  },
  createToken(email) {
    const token = jwt.sign({
      email,
    },
    process.env.SECRET_KEY, { expiresIn: '3d' });
    return token;
  },
};
export default encrypt;
