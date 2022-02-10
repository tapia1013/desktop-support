const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/userController');

// Bring in protect func we created in auth middleware
const { protect } = require('../middleware/authMiddleware');


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router;
