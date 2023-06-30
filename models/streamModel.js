const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  streamsURL: Array,
  mainStreamURL: String,
});

const attendance = mongoose.model('stream', streamSchema);

module.exports = attendance;
