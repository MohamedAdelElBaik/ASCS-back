const express = require('express');

const eventsController = require('../controllers/eventsController');

const router = express.Router();

router
  .route('/')
  .get(eventsController.getAllEvents)
  .post(eventsController.addEvent);

router.route('/:year').get(eventsController.getEventsForYear);
router.route('/:year/:month').get(eventsController.getEventsForMonth);
router.route('/:year/:month/:day').get(eventsController.getEventsForDay);

module.exports = router;
