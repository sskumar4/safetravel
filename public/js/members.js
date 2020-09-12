$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const cityName = $("#city-name");
  const saveWishListBtn = $("#save-btn");
  const citySafetyScore = $("#city-safety-score");
  let scCityName = '';
  let scLgbtq = 0;
  let scMedical =0;
  let scOverall = 0;
  let scPhysicalHarm = 0;
  let scPoliticalFreedom = 0;
  let scTheft = 0;
  let scWomen = 0;

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  function saveCityToDb() {
    console.log('Enter saveCityToDb');
    $.post("/api/citySafetyScore", {
      city: scCityName,
      scLgbtq: scLgbtq,
      scMedical: scMedical,
      scOverall: scOverall,
      scPhysicalHarm: scPhysicalHarm,
      scPoliticalFreedom: scPoliticalFreedom,
      scTheft: scTheft,
      scWomen: scWomen
    })
      .then(function(response) {
        console.log("Successfull Saved city to DB!");
  })
      // .catch(function(err) {
      //   console.log(err);
      // });

    }
  saveWishListBtn.on("click", (event) => {
    event.preventDefault();

  
    if (!scCityName) {
      return;
    }
    saveCityToDb();
    window.location.replace("/wishlist")
  
    // let cityDetails = cityInput.
    // location.replace("scores.html");
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
          console.log('NAME!!',response.name);
          scCityName = response.name;
          //  cityName.empty();
          //  citySafteyScore.empty();
          // append city Name
          cityName.html( `<p style="background:yellow; font-size:14px;
          font-weight:bold" >
          ${response.name}</p>`);

          // append city safety scores
          
          
          citySafetyScore.html(`<ul>`);

          for (property in response.safetyScores) {
           
            citySafetyScore.append(` <li style="background:yellow; list-style-type: none;font-size:14px;
            font-weight:bold"> ${property}:  ${response.safetyScores[property]} </li> ` ) ;
                       
         }
         citySafetyScore.append(`</ul>`);
         // save the saftety scores to be sent to backend for saving in db.

         for (property in response.safetyScores) {
           switch (property) {
             case 'lgbtq':
               scLgbtq = response.safetyScores[property];
               console.log('lgbtc',scLgbtq);
               break;
             case 'medical':
              scMedical = response.safetyScores[property];
              console.log('medical',scMedical);
              break;
             case 'overall':
              scOverall = response.safetyScores[property];
              console.log('overall',scOverall);
              break;
             case 'physicalHarm':
             scPhysicalHarm = response.safetyScores[property];
             console.log('physcicalHarm',scPhysicalHarm);
             break; 
             case 'politicalFreedom':
              scPoliticalFreedom = response.safetyScores[property];
              console.log('politicalFreedom',scPoliticalFreedom);
              break;
             case 'theft':
              scTheft = response.safetyScores[property];
              console.log('theft',scTheft);
              break;
             case 'women':
             scWomen = response.safetyScores[property];
             console.log('women',scWomen);
             break; 
            default:
              console.log('default encountered');
              break;
           }
         }
          // If there's an error, log the error
        })
        // .catch(function(err) {
        //   console.log(err);
        // });
    }
}


// Addwishlist button makes another ajax call


);
