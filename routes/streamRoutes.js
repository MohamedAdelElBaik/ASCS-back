const express = require('express');

const streamController = require(`../controllers/streamController`);
// const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(streamController.getAllStreams)
  .post(streamController.addStream);
router
  .route('/:id')
  .patch(streamController.updateStream)
  .get(streamController.getStream);
// .delete(
//   authController.portect,
//   authController.restrictTo('super-admin', 'admin'),
//   streamController.deleteEmployee
// );

module.exports = router;
