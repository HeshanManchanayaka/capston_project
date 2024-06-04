const express = require('express');
const db = require('./db'); // Import the database connection 
const registerRouter = require('./route/register');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Mount the register router
app.use(registerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
