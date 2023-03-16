const express = require('express');

const employeesController = require(`../controllers/employeesController`);
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.portect, employeesController.getAllEmployees)
  .post(authController.portect, employeesController.addEmployees);
router
  .route('/:id')
  .get(employeesController.getEmployee)
  .patch(employeesController.updateEmployee)
  .delete(
    authController.portect,
    authController.restrictTo('super-admin', 'admin'),
    employeesController.deleteEmployee
  );

module.exports = router;
