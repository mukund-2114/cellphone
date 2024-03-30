// Node.js Backend (server.js)

const express = require('express');
const connectDatabase = require('./config/database')
const routes =require('./routes/routes')
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Connect to the database
connectDatabase();
app.use(cors());
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
