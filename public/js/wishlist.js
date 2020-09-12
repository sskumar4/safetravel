$(document).ready(function () {
 const cityName = $("#city-name");
 const citySafetyScore = $("#city-safety-score");

function getSavedSafeCities() {
  console.log("getSavedSafeCities")
  $.get("/api/savedsafecities").then ( function (data) {
    console.log(data);
    for (let i=0; i < data.length; i++) {
    displaySafeDestination(data[i]);
    
    };
  // }).catch (function(err) {
  //   console.log(err);
  // });
});
}

getSavedSafeCities();

function displaySafeDestination(data) {
  console.log('Enter displaySafeDestination');
   
      
      console.log(data);
      console.log('NAME!!',data.name);
      
      //  cityName.empty();
      //  citySafteyScore.empty();
      // append city Name
      cityName.append( `<p style="background:yellow; font-size:14px;
      font-weight:bold" >
      ${data.name}</p>`);

      // append city safety scores
      
      
      citySafetyScore.append(`<ul>`);

      for (property in data) {
        if (property === 'name' || property === 'id' || property === 'UserId')
           continue;
        citySafetyScore.append(` <li style="background:yellow; list-style-type: none;font-size:14px;
        font-weight:bold"> ${property}:  ${data[property]} </li> ` ) ;
                   
     }
     citySafetyScore.append(`</ul>`);
     

};
});