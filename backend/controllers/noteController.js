const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc     Get notes for a ticekt
// @route    GET /api/tickets/:ticketId/notes
// @access   Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find(req.params.ticketId)

  // make sure its the users ticket... if gives error tickets.user.toString() 
  if (tickets.user !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized')
  }

  // get notes
  const notes = await Note.find({ ticket: req.params.ticketId })

  res.status(200).json(notes)
})




// @desc     Create ticket note
// @route    POST /api/tickets/:ticketId/notes
// @access   Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find(req.params.ticketId)

  // make sure its the users ticket... if gives error remove .toString() 
  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized')
  }

  // get note
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  })

  res.status(200).json(note)
})



module.exports = {
  getNotes,
  addNote,
}