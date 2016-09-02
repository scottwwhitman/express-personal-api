var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Divesite = require("./divesite.js");

module.exports.Animal = require("./animal.js");

module.exports.Country = require("./country.js");

module.exports.Place = require("./place.js");
