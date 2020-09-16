// Requiring path to so we can use relative routes to our HTML files
var express = require("express");
var router = express.Router();
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.render("members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      res.render("members");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/signup", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("signup");
  });

  app.get("/members", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("members");
  });

  
  app.get("/wishlist", isAuthenticated, async function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/wishlist.html"));
    console.log("In /wishlist html routes req.user", req.user);
    let dbCity = await db.City.findAll({
    where: { 
      UserId: req.user.id
    } 
    });
    console.log(dbCity);
    let hbsObject = {cities: dbCity}
    res.render("wishlist",hbsObject);
   }); 
};
