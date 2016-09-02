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

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  // var documents = require('./views/documentations/Api_documentation');
  res.json(apiDocumentation);
});

app.get('/api/profile', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  // var documents = require('./views/documentations/Profile');
  res.json(profile);
});

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
    {method: "GET", path: "/api/profile", description: "Data about me"},
    {method: "GET", path: "/api/divesites", description: "Get all my best divesites"},
    {method: "POST", path: "/api/divesites", description: "Create a new divesite"},
    {method: "GET", path: "/api/divesites/:id", description: "Get a divesite"},
    {method: "PUT", path: "/api/divesites/:id", description: "Update a divesite"},
    {method: "DELETE", path: "/api/divesites/:id", description: "Remove a divesite"},
    {method: "GET", path: "/api/divesites/:divesite_id/animals", description: "Get all animals seen at a divesite"},
    {method: "POST", path: "/api/divesites/:divesite_id/animals", description: "Add an animal seen at a divesite"},
    {method: "PUT", path: "/api/divesites/:divesite_id/animals/:animal_id", description: "Update an animal seen at a divesite"},
    {method: "PUT", path: "/api/divesites/:divesite_id/animals/:animal_id", description: "Remove an animal from a divesite"}
  ]
}



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
