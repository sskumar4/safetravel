$(document).ready(function () {
 const cityName = $("#city-name");
 const citySafetyScoreCol1 = $("#city-safety-score-col1");
 const citySafetyScoreCol2 = $("#city-safety-score-col2");

function getSavedSafeCities() {
  console.log("getSavedSafeCities")
  $.get("/api/savedsafecities").then ( function (data) {
  //  console.log(data);
    //  for (let i=0; i < data.length; i++) {
    //  displaySafeDestination(data[i]);
    
    //  };
    
  // }).catch (function(err) {
  //   console.log(err);
  // });
});
}

//getSavedSafeCities();


function displaySafeDestination(data) {
  console.log('Enter displaySafeDestination');
   
      
      console.log(data);
      console.log('NAME!!',data.name);
      
      // append city Name
      cityName.append( `<p style="background:yellow; font-size:14px;
      font-weight:bold" >
      ${data.name}</p>`);

      // append city safety scores
      
      
      citySafetyScoreCol1.append(`<ul>`);
      citySafetyScoreCol2.append(`<ul>`);
      let i =0;
      for (property in data) {
        if (property === 'name' || property === 'id' || property === 'UserId')
           continue;
        if (i <6 ) {
        citySafetyScoreCol1.append(` <li style="background:yellow; list-style-type: none;font-size:14px;
        font-weight:bold"> ${property}:  ${data[property]} </li> ` ) ;
        }
        else {
          citySafetyScoreCol2.append(` <li style="background:yellow; list-style-type: none;font-size:14px;
          font-weight:bold"> ${property}:  ${data[property]} </li> ` ) ; 
        }
        i++;          
     }
     citySafetyScoreCol1.append(`</ul>`);
     citySafetyScoreCol2.append(`</ul>`);
     

};
});