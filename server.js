// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

 // get API Documentation
app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  // var documents = require('./views/documentations/Api_documentation');
  res.json(apiDocumentation);
});

// get profile
app.get('/api/profile', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  // var documents = require('./views/documentations/Profile');
  res.json(profile);
});

// get all divesites
app.get('/api/divesites', function (req, res) {
  // send all divesites as JSON response
  db.Divesite.find()
    .populate('place')
    .populate('country')
    .populate('animals')
    .exec(function(err, divesites) {
      if (err) { return console.log("index error: " + err); }
      res.json(divesites);
  });
});

// get one divesite
app.get('/api/divesites/:id', function (req, res) {
  var divesiteId = req.params.id;
  // find divesite in db by id
  db.Divesite.findOne({_id: divesiteID}, function(err, divesite) {
    if (err) { return console.log("index error: " + err); }
    res.json(divesite);
  });
});

// create new divesite
app.post('/api/divesites', function (req, res) {
  // create new divesite with form data (`req.body`)
  var newDivesite = new db.Divesite({
    name: req.body.name,
    date: req.body.date,
    image: ""
  });
  // find the place from req.body
  db.Place.findOne({name: req.body.place}, function(err, place){
    if (err) {
      return console.log(err);
    }
    // add this place to the divesite
    newDivesite.place = place;
    // find the country from req.body
    db.Country.findOne({name: req.body.country}, function(err, country){
      if (err) {
        return console.log(err);
      }
      // add this country to the divesite
      newDivesite.country = country;
      // find the animal from req.body
      db.Animal.findOne({name: req.body.animal}, function(err, animal){
        if (err) {
          return console.log(err);
        }
        // add this animal to the divesite
        newDivesite.animals.push(animal);
        // save newDivesite to database
        newDivesite.save(function(err, divesite){
          if (err) {
            return console.log("save error: " + err);
          }
          // send back the divesite!
          res.json(divesite);
        });
      });
    });
  });
});

// create new place
app.post('/api/places', function (req, res) {
  // create new place with form data (`req.body`)
  var newPlace = new db.Place({
    name: req.body.name
  });
  // save newPlace to database
  newPlace.save(function(err, place){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", newPlace.name);
    // send back the place!
    res.json(place);
  });
});

// create new country
app.post('/api/countries', function (req, res) {
  // create new country with form data (`req.body`)
  var newCountry = new db.Country({
    name: req.body.name
  });
  // save newCountry to database
  newCountry.save(function(err, country){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", newCountry.name);
    // send back the country!
    res.json(country);
  });
});

// create new animal
app.post('/api/animals', function (req, res) {
  // create new animal with form data (`req.body`)
  var newAnimal = new db.Animal({
    name: req.body.name
  });
  // save newAnimal to database
  newAnimal.save(function(err, animal){
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", newAnimal.name);
    // send back the animal!
    res.json(animal);
  });
});

// delete divesite
app.delete('/api/divesites/:id', function (req, res) {
  // get divesite id from url params (`req.params`)
  console.log('divesites delete', req.params);
  var divesiteId = req.params.id;
  // find the index of the divesite we want to remove
  db.Divesite.findOneAndRemove({ _id: divesiteId }, function (err, deletedDivesite) {
    res.json(deletedDivesite);
  });
});

// get all animals seen at a divesite
app.get('/api/divesites/:id/animals', function (req, res) {
  // get divesite id
  var divesiteId = req.params.id;
  // send all animals as JSON response
  db.Divesite.findOne({_id: divesiteId}, function (err, foundDivesite) {
    foundDivesite.find().populate('animals')
    .exec(function(err, animals) {
      if (err) { return console.log("index error: " + err); }
      res.json(animals);
    });
  });
});

// add an animal seen at a divesite
app.put('/api/divesites/:id/animals', function (req, res) {
  // set the value of the divesite id and animal update
  console.log(req.body);
  var divesiteId = req.params.id;
  var animalUpdate = req.body.animal;
  // find divesite in db by id
  db.Divesite.findOne({_id: divesiteId}, function (err, foundDivesite) {
    if (err) { return console.log("index error: " + err); }
    // find animal in db by name
    db.Animal.findOne({name: animalUpdate}, function (err, foundAnimal) {
      if (err) { return console.log("index error: " + err); }
      // update divesite animals with data from request body
      foundDivesite.animals.push(foundAnimal);
      foundDivesite.save(function(){
        db.Divesite.findById(divesiteId)
        .populate('place')
        .populate('country')
        .populate('animals')
        .exec(function(err, divesite) {
          if (err) { return console.log("index error: " + err); }
        // send back the divesite!
        res.json(divesite);
        });
      });
    });
  });
});

// update date last visited at a divesite
app.put('/api/divesites/:id/date', function (req, res) {
  // set the value of the divesite id and date update
  console.log(req.body);
  var divesiteId = req.params.id;
  var dateUpdate = req.body.date;
  // find divesite in db by id
  db.Divesite.findOne({_id: divesiteId}, function (err, foundDivesite) {
    if (err) { return console.log("index error: " + err); }
    // update divesite date with data from request body
    foundDivesite.date = dateUpdate;
    foundDivesite.save(function(){
      db.Divesite.findById(divesiteId)
      .populate('place')
      .populate('country')
      .populate('animals')
      .exec(function(err, divesite) {
        if (err) { return console.log("index error: " + err); }
      // send back the divesite!
      res.json(divesite);
      });
    });
  });
});

// update image for a divesite
app.put('/api/divesites/:id/image', function (req, res) {
  // set the value of the divesite id and image update
  console.log(req.body);
  var divesiteId = req.params.id;
  var imageUpdate = req.body.image;
  // find divesite in db by id
  db.Divesite.findOne({_id: divesiteId}, function (err, foundDivesite) {
    if (err) { return console.log("index error: " + err); }
    // update divesite image with data from request body
    foundDivesite.image = imageUpdate;
    foundDivesite.save(function(){
      db.Divesite.findById(divesiteId)
      .populate('place')
      .populate('country')
      .populate('animals')
      .exec(function(err, divesite) {
        if (err) { return console.log("index error: " + err); }
      // send back the divesite!
      res.json(divesite);
      });
    });
  });
});


/**********
 * PROFILE & DOCUMENTATION DATA *
 **********/

var profile = {
  name: "Scott Whitman",
  githubLink: "https://github.com/scottwwhitman",
  githubProfileImage: " ",
  personalSiteLink: "https://scottwwhitman.github.io/",
  currentCity: "San Francisco, CA",
  pets: "None"
}

var apiDocumentation = {
  title: "Scott's greatest dives sites app",
  message: "Welcome to my personal api on the greatest dive sites I've been to! Here's what you need to know!",
  documentationUrl: "https://github.com/scottwwhitman/express-personal-api",
  baseUrl: "https://fierce-savannah-91724.herokuapp.com/",
  endpoints: [
    {method: "GET", path: "/api", description: "Describes all available endpoints"},
    {method: "GET", path: "/api/profile", description: "Profile data about Scott Whitman"},
    {method: "GET", path: "/api/divesites", description: "Get data on all my best divesites"},
    {method: "GET", path: "/api/divesites/:id", description: "Get data for one of my best divesites"},
    {method: "POST", path: "/api/divesites", description: "Create a new divesite"},
    {method: "POST", path: "/api/places", description: "Create a new divesite place"},
    {method: "POST", path: "/api/countries", description: "Create a new divesite country"},
    {method: "POST", path: "/api/animals", description: "Create a new animal seen at a divesite"},
    {method: "DELETE", path: "/api/divesites/:id", description: "Remove a divesite"},
    {method: "GET", path: "/api/divesites/:id/animals", description: "Get all animals seen at a divesite"},
    {method: "PUT", path: "/api/divesites/:id/animals", description: "Add an animal seen at a divesite"},
    {method: "PUT", path: "/api/divesites/:id/date", description: "Update the date last visited a divesite"},
    {method: "PUT", path: "/api/divesites/:id/image", description: "Update the image for a divesite"}
  ]
}


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
