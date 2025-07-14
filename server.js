const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://mansoorabdullah580:mansoor0123@nodj6test.wtp7fip.mongodb.net/?retryWrites=true&w=majority&appName=timelineDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

// Routes
const timelineRoutes = require('./routes/timeline');
app.use('/', timelineRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
