// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var divesites_list = [
  {
  name: "Vertigo",
  date: "May 2015",
  image: "",
  place: "Yap",
  country: "Micronesia",
  animals: ['Black Tip Shark', 'White Tip Reef Shark']
  },
  {
  name: "Yap Caverns",
  date: "May 2015",
  image: "",
  place: "Yap",
  country: "Micronesia",
  animals: ['Micro Reef Fish', 'White Tip Reef Shark']
  },
  {
  name: "Stumphtish",
  date: "May 2015",
  image: "",
  place: "Yap",
  country: "Micronesia",
  animals: ['Manta Ray']
  },
  {
  name: "Baited Shark Dive - Aliwal Shoal",
  date: "July 2015",
  image: "",
  place: "Aliwal Shoal",
  country: "South Africa",
  animals: ['Oceanic White Tip Shark', 'Potato Bass']
  },
  {
  name: "Baited Shark Dive - Protea Banks",
  date: "August 2015",
  image: "",
  place: "Protea Banks",
  country: "South Africa",
  animals: ['Oceanic White Tip Shark', 'Potato Bass', 'Tiger Shark']
  }
];

var places_list = [
  {
    name: "Yap"
  },
  {
    name: "Aliwal Shoal"
  },
  {
    name: "Protea Banks"
  }
];

var countries_list = [
  {
    name: "Micronesia"
  },
  {
    name: "South Africa"
  }
];

var animals_list = [
  {
    name: "Black Tip Shark"
  },
  {
    name: "White Tip Reef Shark"
  },
  {
    name: "Micro Reef Fish"
  },
  {
    name: "Manta Ray"
  },
  {
    name: "Oceanic White Tip Shark"
  },
  {
    name: "Potato Bass"
  },
  {
    name: "Tiger Shark"
  }
];

db.Place.remove({}, function(err, places) {
  console.log('removed all places');
  db.Place.create(places_list, function(err, places){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all places');
    console.log("created", places.length, "places");


    db.Country.remove({}, function(err, countries) {
      console.log('removed all countries');
      db.Country.create(countries_list, function(err, countries){
        if (err) {
          console.log(err);
          return;
        }
        console.log('recreated all countries');
        console.log("created", countries.length, "countries");


        db.Animal.remove({}, function(err, animals) {
          console.log('removed all animals');
          db.Animal.create(animals_list, function(err, animals){
            if (err) {
              console.log(err);
              return;
            }
            console.log('recreated all animals');
            console.log("created", animals.length, "animals");


            db.Divesite.remove({}, function(err, divesites) {
              console.log('removed all divesites');
              // db.Divesite.create(divesites_list, function(err, divesites){
              //   if (err) {
              //     console.log(err);
              //     return;
              //   }
              //   console.log('recreated all divesites');
              //   console.log("created", divesites.length, "divesites");
                divesites_list.forEach(function (divesiteData) {
                  var divesite = new db.Divesite({
                    name: divesiteData.name,
                    date: divesiteData.date,
                    image: divesiteData.image
                  });
                  db.Place.findOne({name: divesiteData.place}, function (err, foundPlace) {
                    console.log('found place ' + foundPlace.name + ' for divesite ' + divesite.name);
                    if (err) {
                      console.log(err);
                      return;
                    }
                    divesite.place = foundPlace;
                    divesite.save(function(err, savedDivesite){
                      if (err) {
                        return console.log(err);
                      }
                      console.log('saved ' + foundPlace.name + ' for ' + savedDivesite.name);
                    });
                  });
                  db.Country.findOne({name: divesiteData.country}, function (err, foundCountry) {
                    console.log('found country ' + foundCountry.name + ' for divesite ' + divesite.name);
                    if (err) {
                      console.log(err);
                      return;
                    }
                    divesite.country = foundCountry;
                    divesite.save(function(err, savedDivesite){
                      if (err) {
                        return console.log(err);
                      }
                      console.log('saved ' + foundCountry.name + ' for ' + savedDivesite.name);
                    });
                  });


                  db.Animal.findOne({name: {$in: divesiteData.animals}}, function (err, foundAnimal) {
                    console.log('found animal ' + foundAnimal.name + ' for divesite ' + divesite.name);
                    if (err) {
                      console.log(err);
                      return;
                    }
                    // THIS MAY NOT WORK
                    divesite.animals.push(foundAnimal);
                    divesite.save(function(err, savedDivesite){
                      if (err) {
                        return console.log(err);
                      }
                      console.log('saved ' + foundAnimal.name + ' for ' + savedDivesite.name);
                    });
                  });


                });
              // });
            });
          });
        });
      });
    });
  });
  // process.exit();
});
