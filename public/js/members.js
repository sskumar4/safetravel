$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
// add API code and addEventListener ajax calls
const submitButton = $("#submit");
const cityInput = $("#city-input");
submitButton.on("click", (event) => {
  event.preventDefault();
  const cityData = {
    city: cityInput.val().trim()
  };

  if (!cityData.city) {
    return;
  }
    // If we have an email and password we run the loginUser function and clear the form
    getSafetyScore(cityData.city);
    cityInput.val("");

  // let cityDetails = cityInput.
  // location.replace("scores.html");
});


    // getSafetyScore does a post to our "api/login" route and if successful, redirects us the the members page
    function getSafetyScore(city) {
      console.log('Enter getSafetyScore');
      $.get("/api/safetyScore", {
        city: city
      })
        .then(function(response) {
          console.log('Successful getSafetyScore');
//         window.location.replace("/members");
// add the jquery code to display the safety score
          console.log(response);
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
}


// Addwishlist button makes another ajax call


);
