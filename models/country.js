var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CountrySchema = new Schema({
  name: String
});

var Country = mongoose.model('Country', CountrySchema);

module.exports = Country;
