const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'A attendance must have a time'],
    unique: true,
  },
  employees: {
    type: Array,
  },
});

const attendance = mongoose.model('attendances_till_fixes', attendanceSchema);

module.exports = attendance;
