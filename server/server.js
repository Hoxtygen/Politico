import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index';

const app = express();

const port = process.env.PORT || 5002;

//  use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  routes

app.use('/api/v1', router);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Politico, the most secured electronic voting system',
  });
});

//  load up the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;
