import express from 'express';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes/index';

const app = express();

const port = process.env.PORT || 5003;

//  use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

//  routes

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Politico, the most secured electronic voting system',
  });
});

app.use(validator());

/* app.use('*',  (res, req) => {
  res.json({
    message: 'Invalid route',
  });
}); */

//  load up the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;
