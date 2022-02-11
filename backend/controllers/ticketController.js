const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');



// @desc     Get user tickets
// @route    /api/tickets
// @access   Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // get the ticket from ticketSchema
  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})




// @desc     Create user tickets
// @route    POST /api/tickets
// @access   Private
const createTicket = asyncHandler(async (req, res) => {
  const { description, product } = req.body;

  if (!product || !description) {
    res.status(404);
    throw new Error('Please add a product and description');
  }

  // Get user usig the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found')
  }

  // create the ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })

  res.status(201).json(ticket)
})



module.exports = {
  getTickets,
  createTicket
}