// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");


// let Amadeus = require("amadeus");
// let amadeus = new Amadeus({
//   clientId: "sUAyDrSxoGCj56mOBwSk0HZkcKvSMwaM",
//   clientSecret: "iLaaA0Tho8mG7AAm"
// });
// -- begin geocoding
// const NodeGeocoder = require('node-geocoder');
 
// const options = {
//   provider: 'google',
 
//   // Optional depending on the providers
//   // fetch: customFetchImplementation,
//   apiKey: 'AIzaSyCfDYADGJE3VqDySqGIaOEm11YWCi-4nDs', // for Mapquest, OpenCage, Google Premier
//   formatter: null // 'gpx', 'string', ...
// };
 
// const geocoder = NodeGeocoder(options);
// //let cityName = 'Barcelona';
// // Using callback
// // async (cityName) => getGeoCode{
// async function getMyGeoCode(cityName) {
// const res = await geocoder.geocode(cityName);
// console.log('res',res);
// console.log('res.lat', res[0].latitude, 'res.long', res[0].longitude);
// };
// let cityname = 'Washington DC, USA'
// getMyGeoCode(cityname);

// -- end geocoding


// amadeus.safety.safetyRatedLocations.get({
//   latitude: 41.397158,
//   longitude: 2.160873
// }).then(function (response) {
//   console.log('success-response',response);
// }).catch(function (response) {
//   console.error('error-response',response);
// });

// $.ajax({
//   type: "get",
//   url: "https://test.api.amadeus.com/v1/safety/safety-rated-locations?latitude= 41.403749&longitude= 2.174387",
//   dataType: 'json',
//   async: true,
//   beforeSend: function(xhr) {
//       xhr.setRequestHeader('Authorization',
//           'Bearer ' + amadeusAccessToken);
//   },                
//   success: function(json) {
//       console.log(json);
//   }
// });
// amadeus.safety.safetyRatedLocations.get({
//   latitude: 41.397158,
//   longitude: 2.160873
// }).then(function(response){
//   console.log(response.data);
// }).catch(function(responseError){
//   console.log(responseError.code);
// });

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
