import dbConfig from './server/database/dbConfig';
import encrypt from './server/controllers/encrypt';

const password = encrypt.encryptPwd('clusters1988');
const values = ['Adeniyi', 'Wasiu', 'Idowu', '08060184972', 'udub-it@hotmail.com', password, 'wwww.udubpass.com', true];
const query = 'INSERT INTO politico_andela.users (firstname, lastname, phonenumber, othername, email, password, passportUrl, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const seed = () => dbConfig.query(query, values).then(() => console.log('admin seeded')).catch(err => console.log(err));
seed();

export default seed;
