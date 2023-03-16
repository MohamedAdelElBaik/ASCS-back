const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A event must have a type'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  arrivedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
