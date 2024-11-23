const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const backend = express();


backend.use(cors()); 
// backend.use(cors({ origin: 'http://localhost:3000' })); // Restrict to frontend origin


backend.use(bodyParser.json());

backend.use('/api/tasks', taskRoutes);


const connectDb = async () => {
  
  await mongoose.connect(`mongodb+srv://sevith:1234@cluster0.nkyct.mongodb.net/task3`);
  console.log(`The DB is connected to ${mongoose.connection.host}`);
};

connectDb();

backend.get('/', (req, res) => {
  res.send('Hello World');
});

backend.options('*', cors());

backend.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = backend;
