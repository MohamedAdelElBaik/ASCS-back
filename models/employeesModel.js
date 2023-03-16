// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A employee must have a name'],
    trim: true,
    unique: true,
    maxLength: [
      40,
      'A employee name must have less or equal then 40 characters',
    ],
    minLength: [
      10,
      'A employee name must have more or equal then 10 characters',
    ],
  },
  gender: {
    type: String,
    required: [true, 'A employee must have a gender'],
    enum: {
      values: ['male', 'female'],
      message: 'gender is either male or female',
    },
  },
  birthDate: Date,
  department: {
    type: String,
    required: [true, 'A employee must have a department'],
  },
  job: {
    type: String,
    required: [true, 'A employee must have a jop'],
  },
  description: {
    type: String,
    trim: true,
  },
  arrivedAt: {
    type: Date,
    default: Date.now(),
  },
  hireDate: {
    type: Date,
    default: Date.now(),
  },
  image: String,
  attendance: [Date],
  violations: [String],
});

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
