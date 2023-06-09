const express = require('express');

const attendancesController = require('../controllers/attendanceController');

const router = express.Router();

router
  .route('/')
  .get(attendancesController.getAllAttendances)
  .post(attendancesController.checkBody, attendancesController.addAttendances);

// router.route('/:id').get(attendancesController.getAttendance);

router
  .route('/dashboard/:year')
  .get(attendancesController.getAttendanceDashYear);
router
  .route('/dashboard/:year/:month')
  .get(attendancesController.getAttendanceDashMonth);
router
  .route('/dashboard/:year/:month/:day')
  .get(attendancesController.getAttendanceDashDay);

router.route('/:year/:month/:day').get(attendancesController.getAttendanceDay);

module.exports = router;
