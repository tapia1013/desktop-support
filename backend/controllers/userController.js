// Async handler so we wont have to do .then() .catch()
const asyncHandler = require('express-async-handler');
// Hash password
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Model - userSchema
const User = require('../models/userModel');



// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields!')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  // res.send('Register Route');
});





// @desc    Login a new user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email
  });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  // res.send('Login Route');
});





// @desc    GET current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  // get user by id cause now we have access to it cause authMiddlware
  res.status(200).json(user)
  /**{
    "id": "620591f773d57837dfa04f98",
    "email": "cookie@gmail.com",
    "name": "cookie"
  } */
})




// Generate JSONWEBTOKEN
const generateToken = (id) => {
  // jwt has its own method called sign, pass in ({id},secrete,{options})
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '32500d'
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMe,
}