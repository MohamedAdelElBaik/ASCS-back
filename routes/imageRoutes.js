const express = require('express');
const imageController = require('../controllers/imageController');
const multerConfig = require('../multer');

const router = express.Router();

router.get('/:id', imageController.getImage);
router.post('/', multerConfig, imageController.postImage);

module.exports = router;
