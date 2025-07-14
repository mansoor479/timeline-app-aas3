const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Message = require('../models/Message');
const Comment = require('../models/Comment');

// Show timeline
router.get('/', async (req, res) => {
 const messages = await Message.find()
  .sort({ createdAt: -1 })
  .populate('user');

for (let msg of messages) {
  msg.comments = await Comment.find({ message: msg._id })
    .populate('user')
    .sort({ createdAt: -1 });
}

  res.render('timeline', { messages });
});

// Post a message
router.post('/message', async (req, res) => {
  const user = await User.findOne(); // TEMP: get any user for now
  await Message.create({ user, message: req.body.message });
  res.redirect('/');
});

// Post a comment
router.post('/comment/:messageId', async (req, res) => {
  const user = await User.findOne(); // TEMP: get any user for now
  const message = await Message.findById(req.params.messageId);
  await Comment.create({ user, message, comment: req.body.comment });
  res.redirect('/');
});

module.exports = router;
