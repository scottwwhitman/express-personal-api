var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  Place = require('./place');
  Country = require('./country');
  Animal = require('./animal');

var DivesiteSchema = new Schema({
  name: String,
  date: Date,
  image: String,
  place: {type: Schema.Types.ObjectId, ref: 'Location'},
  country: {type: Schema.Types.ObjectId, ref: 'Country'},
  animals: [{type: Schema.Types.ObjectId, ref: 'Animal', sightings: ''}]
});

var Divesite = mongoose.model('Divesite', DivesiteSchema);

module.exports = Divesite;
