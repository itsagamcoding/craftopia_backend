const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();

require('dotenv').config();
require('express-async-errors');
//connectDB
app.use(cors());
const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authentication');
//routers
const authRouter = require('./routes/auth')
// const jobsRouter = require('./routes/jobs')


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth',authRouter);
// app.use('/api/v1/jobs',authenticateUser,jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


app.use(bodyParser.json());

app.post('/writeCartToJson', (req, res) => {
  const cartData = req.body;
  res.send("Hi")
  const cartJson = JSON.stringify(cartData);
  fs.writeFile('cart.json', cartJson, (err) => {
    if (err) {
      console.error('Error writing cart data to JSON:', err);!~
      res.status(500).send('Error writing cart data to JSON');
    } else {
      console.log('Cart data written to JSON successfully');
      res.status(200).send('Cart data written to JSON successfully');
    }
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cart data:', err);
      res.status(500).json({ error: 'Error reading cart data' });
    } else {
      const cartData = JSON.parse(data);
      res.json(cartData);
      console.log(cartData);
    }
  });
});

const port = process.env.PORT || 3001;;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();