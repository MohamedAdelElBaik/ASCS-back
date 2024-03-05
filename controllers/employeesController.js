const Employees = require('../models/employeesModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Employees.find(), req.query)
    .filter()
    .sort()
    .fildLimit()
    .paginat();
  const employees = await features.query;

  res.status(200).json({
    status: 'success',
    results: employees.length,
    data: {
      employees,
    },
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employees.findOne({ employee_id: req.params.id });

  // if there is no employee with that id
  if (!employee) {
    return next(new AppError(`No Employee with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.addEmployees = catchAsync(async (req, res, next) => {
  const employee = await Employees.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employees.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // handle error if there is no embloyee with that id
  if (!employee) {
    return next(new AppError(`No Employee found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employees.findByIdAndDelete(req.params.id);

  // handle error if there is no embloyee with that id
  if (!employee) {
    return next(new AppError(`No Employee found with that ID`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
