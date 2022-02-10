const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

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

// Error handler
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))