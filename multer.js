const multer = require('multer');

// stores file on disk
const fileStorage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  console.log('file: ', file);

  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage: fileStorage, fileFilter: fileFilter }).any();
