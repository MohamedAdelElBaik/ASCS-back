const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'A event must have a type'],
    trim: true,
  },
  info: {
    type: Object,
  },
  arriveAt: {
    type: Date,
    default: Date.now(),
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
