const mongoose = require('mongoose');

// Define a schema for the item model
const itemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  date: Date,
  user: String,
  department: String,
  software: String,
  seats: Number,
  amount: Number,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;