import bcrypt from 'bcryptjs';
import dbConfig from './server/database/dbConfig';


// const admin = [
//     'Adeniyi', 'Wasiu', 'Idowu', 'udub-it@hotmail.com', 08060184972, 'wwww.udubpass.com', bcrypt.hashSync('clusters1988', bcrypt.genSaltSync(14)), true
// ]
const query = 'INSERT INTO politico_andela.users (firstname, lastname, phonenumber, othername, email, password, passportUrl, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', ['Adeniyi', 'Wasiu', 'Idowu', 08060184972, 'udub-it@hotmail.com', bcrypt.hashSync('clusters1988', bcrypt.genSaltSync(14), 'wwww.udubpass.com', true];

dbConfig.query(query).then(res => console.log('admin seeded')).catch(err => console.log(err));
