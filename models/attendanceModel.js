const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'A attendance must have a time'],
    unique: true,
  },
  employees: {
    type: Array,
  },
});

const attendance = mongoose.model('attendances_till_fixs', attendanceSchema);

module.exports = attendance;
