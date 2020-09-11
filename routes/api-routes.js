// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// -- begin geocoding
const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'google',
 
  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: 'AIzaSyCfDYADGJE3VqDySqGIaOEm11YWCi-4nDs', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

async function getMyGeoCode(cityName) {
const res = await geocoder.geocode(cityName);
console.log('res',res);
console.log('res.lat', res[0].latitude, 'res.long', res[0].longitude);
return res;
};
 

// let cityname = 'Washington DC, USA'
// getMyGeoCode(cityname);

// -- end geocoding

// -- begin Amaedeus
let Amadeus = require("amadeus");
let amadeus = new Amadeus({
  clientId: "sUAyDrSxoGCj56mOBwSk0HZkcKvSMwaM",
  clientSecret: "iLaaA0Tho8mG7AAm"
});


module.exports = function(app) {



  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.get("/api/safetyScore", async function(req, res) {
 // First extract city Name from the req
 // Do geocoding and get lat, long from geocoding API
 

 console.log('req.query.city', req.query.city);
   let result = await getMyGeoCode(req.query.city);
console.log('result',result);
console.log ('lat', result[0].latitude);
console.log ('long', result[0].longitude);

// call Amadeus  API to get safety score
amadeus.safety.safetyRatedLocations.get({
  latitude: result[0].latitude,
  longitude: result[0].longitude,
}).then(function (response) {
  console.log('success-response',response);
  res.json(response.data[0]);
}).catch(function (err) {
  console.error('error-response',err);
});


 // return city name and safety score back to front end

    });
  app.post("/api/citySafetyScore", function(req, res) {
    console.log('In route - api/citySafetyScore');
    console.log('req.body',req.body);
    console.log(req.user);
    db.City.create({
      name: req.body.city,
      scLgbtq: req.body.scLgbtq,
      scMedical: req.body.scMedical,
      scOverall: req.body.scOverall,
      scPhysicalHarm: req.body.scPhysicalHarm,
      scPoliticalFreedom: req.body.scPoliticalFreedom,
      scTheft: req.body.scTheft,
      scWomen:req.body.scWomen
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
    });
};
