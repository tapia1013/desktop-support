const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();


const app = express();


// allows us to send raw json
app.use(express.json());
// accept url encoded form
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to support desk API' })
})


// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


// Error handler
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))