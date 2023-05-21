const Attendance = require('../models/attendanceModel');
const Employees = require('../models/employeesModel');
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

  getEventRequest(attendance, res);
});

exports.getAttendanceMonth = catchAsync(async (req, res, next) => {
  const attendance = await Attendance.find(getDate(req.params));

  getEventRequest(attendance, res);
});

exports.getAttendanceYear = catchAsync(async (req, res, next) => {
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

// const arr = [
//   ['2023-03-14T01:01:28.955Z', '111111'],
//   ['2023-03-14T01:12:26.275Z', '121212'],
//   ['2023-03-14T01:12:28.928Z', '131313'],
//   ['2023-03-14T01:12:32.769Z', '111111'],
//   ['2023-03-14T01:13:29.732Z', '121212'],
//   ['2023-03-14T01:13:31.742Z', '131313'],
//   ['2023-03-14T01:13:35.783Z', '111111'],
//   ['2023-03-14T01:20:12.535Z', '121212'],
//   ['2023-03-14T01:20:13.731Z', '131313'],
//   ['2023-03-14T01:20:17.375Z', '111111'],
//   ['2023-03-14T01:21:19.373Z', '121212'],
//   ['2023-03-14T01:21:21.170Z', '131313'],
//   ['2023-03-14T01:21:25.086Z', '111111'],
//   ['2023-03-14T01:22:20.845Z', '121212'],
//   ['2023-03-14T01:22:22.667Z', '131313'],
//   ['2023-03-14T01:22:26.476Z', '111111'],
//   ['2023-03-14T01:23:23.354Z', '121212'],
//   ['2023-03-14T01:23:25.636Z', '131313'],
//   ['2023-03-14T01:23:29.579Z', '111111'],
//   ['2023-03-14T01:24:27.233Z', '121212'],
//   ['2023-03-14T01:24:28.938Z', '131313'],
//   ['2023-03-14T01:24:32.754Z', '111111'],
// ];
