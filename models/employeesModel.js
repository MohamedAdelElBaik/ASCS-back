const mongoose = require('mongoose');
const validator = require('validator');

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
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: String,
  shiftStartAt: {
    type: Number,
    default: 8,
  },
  shiftEndAt: {
    type: Number,
    default: 16,
  },
  salary: {
    type: Number,
    required: [true, ' A employee must have a Salary'],
  },
  lastEdit: {
    type: Date,
    default: Date.now(),
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
  imagePath: String,
  attendance: [Date],
  violations: [String],
});

const employee = mongoose.model('employee', employeeSchema);

module.exports = employee;
