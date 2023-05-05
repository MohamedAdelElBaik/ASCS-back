const express = require('express');

const eventsController = require('../controllers/eventsController');

const router = express.Router();

router
  .route('/')
  .get(eventsController.getAllEvents)
  .post(eventsController.addEvent);

router.route('/:id').get(eventsController.getEvents);

module.exports = router;
