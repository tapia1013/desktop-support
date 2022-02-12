const express = require('express');
const router = express.Router();
const { getNotes, addNote } = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, addNote);

module.exports = router;

// /api/tickets/:ticketId/notes