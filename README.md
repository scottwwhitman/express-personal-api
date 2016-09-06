# Personal API Project - Scott Whitman

**Objective:** Build a personal API with well-documented JSON API endpoints, a full set of REST-ful routes, at least one CRUD-able resource, and a profile endpoint about myself

**Description:** My API allows users to access and CRUD data about my favorite divesites.  I also built a front-end dashboard to use and consume my API.

**Link to the App:**  <a href="https://fierce-savannah-91724.herokuapp.com/">Scott's Greatest Divesites API</a>


## Technologies used
* HTML   
* CSS  
* JavaScript
* JQuery
* Handlebars
* Bootstrap
* Node
* Express
* Mongoose
* MongoDB
* BodyParser
* Ajax
* JSON
* Github
* Heroku


## Original code / project instructions
* Original instructions:   
<a href="https://github.com/sf-wdi-31/express-personal-api">Personal API Project Instructions</a>


## Interesting code I built
* Built a seed.js file to populate my database, which utilizes referenced data.
* Built a route that creates divesites in my database using referenced data from other database files in lines 82 - 122 of server.js.
* Built routes to add new places, countries and animals to the database in lines 124 - 173 of server.js.
* Built a route to add an animal seen at a divesite by referencing the animal data in the database in lines 200 - 227 of server.js.
* Wrote javascript to handle API call and success/failure for adding an animal seen to a divesite 230 - 262 of app.js.
* Wrote a function to render all the divesites using handlebars in lines 59 - 70 of app.js.


## Problems I have encountered
* 1) Heroku is not running my MongoDB database.  Everything works fine locally, but having a problem here.  Still working to solve this problem.

* 2) Need to add responsiveness so page works correctly on different screen sizes.  Currently formatted for Macbook.


## Screenshots
* API start screen with documentation link, profile link and divesite creator:
<img src="images/startscreen.png">

* API database inputs and divesites:
<img src="images/divesites.png">
