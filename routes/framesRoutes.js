const express = require('express');

const framesController = require('../controllers/framesController');

const router = express.Router();

router
  .route('/')
  .get(framesController.getAllFrames)
  .post(framesController.createFrames);
router.route('/:id').delete(framesController.deleteFrames);

module.exports = router;
