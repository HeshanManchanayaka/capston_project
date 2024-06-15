require('dotenv').config();

const express = require('express');
const cors = require('cors');
const registerRouter = require('./route/register');
const loginRouter = require('./route/login');
const profileRouter = require('./route/profile');
const adminRouter = require('./route/admin');

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routers
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/profile', profileRouter);
app.use('/api/admin',adminRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
