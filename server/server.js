import express from 'express';
import bodyParser from 'body-parser';
import partiesRouter from './routes/partiesRoute';

const app = express();

const port = process.env.PORT || 5002;

//  use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Politico, the most secured electronic voting system',
  });
});

app.use('/api/v1', partiesRouter);

//  load up the server
app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;
