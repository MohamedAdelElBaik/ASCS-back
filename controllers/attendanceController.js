const Attendance = require('../models/attendanceModel');
// const Employees = require('../models/employeesModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAttendances = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Attendance.find(), req.query)
    .filter()
    .sort()
    .fildLimit()
    .paginat();
  const attendance = await features.query;

  res.status(200).json({
    status: 'success',
    results: attendance.length,
    data: attendance,
  });
});

// exports.getAttendance = catchAsync(async (req, res, next) => {
//   const attendance = await Attendance.findOne({ date: req.params.id });

//   res.status(200).json({
//     status: 'success',
//     data: attendance && attendance.employees,
//   });
// });

const getEventRequest = (attendance, res) => {
  const result = attendance.map((employeesData) => {
    return {
      employees: employeesData.employees.length,
      _id: employeesData._id,
      date: employeesData.date,
    };
  });

  res.status(200).json({
    status: 'success',
    results: attendance.length,
    data: result,
  });
};

const getDate = (params) => {
  const year = params.year;
  const month = params.month;
  const day = params.day;

  const startDate = new Date(
    `${year}-${month || '01'}-${day || '01'}T00:00:00.000Z`
  );
  const endDate = new Date(
    `${year}-${month || '12'}-${day || '31'}T23:59:59.999Z`
  );

  return {
    date: { $gte: startDate, $lt: endDate },
  };
};

exports.getAttendanceDay = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find(getDate(req.params));

  const results =
    attendance[0] && attendance[0].employees
      ? attendance[0].employees.length
      : 0;
  const data = attendance[0] || {};

  res.status(200).json({
    status: 'success',
    results,
    data,
  });
});

exports.getAttendanceDashDay = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find(getDate(req.params));

  getEventRequest(attendance, res);
});

exports.getAttendanceDashMonth = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find(getDate(req.params));

  getEventRequest(attendance, res);
});

exports.getAttendanceDashYear = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find(getDate(req.params));

  getEventRequest(attendance, res);
});

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.employeeId) {
    return res.status(400).json({
      status: 'fail',
      message: 'name or employeeId not found',
    });
  }
  next();
};

// exports.getAllAttendances = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     resevedAt: req.requestTime,
//     results: attendances.length,
//     data: {
//       attendances,
//     },
//   });
// };

exports.addAttendances = (req, res) => {
  console.log('------', req.body);

  const newId = attendances[attendances.length - 1].id + 1;
  const newAttendance = Object.assign({ id: newId }, req.body);

  attendances.push(newAttendance);

  fs.writeFile(
    `${__dirname}/../dev-data/data/attendanceData.json`,
    JSON.stringify(attendances),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          employee: newAttendance,
        },
      });
    }
  );
};
