const express = require('express');
const cors = require('cors');
const registerRouter = require('./route/register');
const loginRouter = require('./route/login');
// require('dotenv').config(); // To load the JWT secret from .env file

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routers
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

const PORT =   5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
