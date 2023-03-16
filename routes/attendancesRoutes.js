const express = require('express');

const attendancesController = require('../controllers/attendanceController');

const router = express.Router();

router
  .route('/')
  .get(attendancesController.getAllAttendances)
  .post(attendancesController.checkBody, attendancesController.addAttendances);

router.route('/:id').get(attendancesController.getAttendance);

module.exports = router;
