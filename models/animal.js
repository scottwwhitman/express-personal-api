var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AnimalSchema = new Schema({
  name: String
});

var Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;
