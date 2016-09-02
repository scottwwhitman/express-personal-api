module.exports = {
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
