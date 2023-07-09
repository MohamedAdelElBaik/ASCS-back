const express = require('express');
const imageController = require('../controllers/imageController');
const multerConfig = require('../multer');

const router = express.Router();

router.get('/', imageController.getAllImage);
router.post('/', multerConfig, imageController.postImage);
router.get('/:id', imageController.getImage);

module.exports = router;
