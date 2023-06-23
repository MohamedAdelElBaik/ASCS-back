const mongoose = require('mongoose');

const imageUpload = mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  arriveAt: {
    type: Date,
    default: Date.now(),
  },
});

// const imageUpload = mongoose.model('Event', imageUpload);

// module.exports = imageUpload;

module.exports = mongoose.model('imageUpload', imageUpload);
