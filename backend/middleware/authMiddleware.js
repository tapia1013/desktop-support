// JWT
const jwt = require('jsonwebtoken');
// ASYNC HANDLER
const asyncHandler = require('express-async-handler');
// USER MODEL
const User = require('../models/userModel');


// Function that PROTECTS routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check for token in Headers and starts with "Bearer + token"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header and split it off Bearer
      token = req.headers.authorization.split(' ')[1];
      // Verify token after split, token, secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user info from decoded token without PW
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    }
  }

  // Check if not token then throw error
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized');
  }
})




module.exports = { protect }

