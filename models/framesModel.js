const mongoose = require('mongoose');

const frameSchema = new mongoose.Schema({
  exists: [String],
  img: [String],
  department: String,
  task_purpose: String,
  task_type: String,
  arrivedAt: {
    type: Date,
    default: Date.now(),
  },
});

const frame = mongoose.model('frame', frameSchema);

module.exports = frame;
