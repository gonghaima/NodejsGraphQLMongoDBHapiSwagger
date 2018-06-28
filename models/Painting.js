const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaitingSchema = new Schema({
  name: String,
  url: String,
  techniques: [String]
});

module.exports = mongoose.model('Painting', PaitingSchema);