import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { checkCountry, checkCity, checkStreet } from './src/js/checkers.js';
import { roundsDatabase } from './src/js/roundsDatabase.js';
import { Round } from './src/js/round.js';
import { calculateDistance, getRoundScore, generateRandomNumber } from './src/js/calculate.js';




let theGame;
let markers = [];
let randomRound = generateRandomNumber(0, roundsDatabase.length-1);

let countryMultiplier;
let cityMultiplier;
let streetMultiplier;
let pinMultiplier;

let countryMultiplierLi = document.querySelector('.country-multiplier');
let cityMultiplierLi = document.querySelector('.city-multiplier');
let streetMultiplierLi = document.querySelector('.street-multiplier');
let pinMultiplierLi = document.querySelector('.pin-multiplier');
let multipliersSpan = document.querySelector('.multipliers h3 span');

let helloScreenLeft = document.querySelector('.hello-screen__left');
let helloScreenRight = document.querySelector('.hello-screen__right');
let helloMsg = document.querySelector('.hello-msg');
let mapDiv = document.querySelector('.map');
let streetViewDiv = document.querySelector('.street-view');
let skipButton = document.querySelectorAll('.skip-button');
let nextRound = document.querySelector('.next-round');
let guessButton = document.querySelector('.guess-place');
let moveToStart = document.querySelector('.restart');
let formCountry = document.querySelector('.form-country');
let formCity = document.querySelector('.form-city');
let formStreet = document.querySelector('.form-street');
let messageDiv = document.querySelector('.message');
let shotsDiv = document.querySelector('.shots');
let scoreSpan = document.querySelector('.points');
let roundScoreDiv = document.querySelector('.round-score');
let errorHeader = document.querySelector('.error');
let bonusDiv = document.querySelector('.bonus');

let actualCountry = document.querySelector('.actual-country');
let actualCity = document.querySelector('.actual-city');
let actualStreet = document.querySelector('.actual-street');

function switchToCity(){
  formCountry.classList.add('invisible');
  formCity.classList.remove('invisible');
  messageDiv.innerText = "Good job! Try guessing city now.";
  theGame.rounds[theGame.rounds.length-1].shots--;
  shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
  countryMultiplier = 0;
}
function switchToStreet(){
  formCity.classList.add('invisible');
  formStreet.classList.remove('invisible');
  messageDiv.innerText = "Nice! Time to guess the street."
  theGame.rounds[theGame.rounds.length-1].shots--;
  shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
  cityMultiplier = 0;
}
function switchToPin(){
  messageDiv.innerText = "Great! Now make a guess on map where exactly are you."
  theGame.rounds[theGame.rounds.length-1].shots--;
  shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
  // MAP AND BUTTON SLIDE IN
  mapDiv.style.transition = "0.5s ease";
  mapDiv.style.left = "30px";
  streetMultiplier = 0;
  formStreet.querySelector('input').setAttribute("disabled", "true");
  formStreet.querySelector('button').setAttribute("disabled", "true");
  formStreet.querySelector('.skip-button').setAttribute("disabled", "true");

}
function bonusAppear(bonus){
  bonusDiv.innerText = `+${bonus}`;
  bonusDiv.style.visibility = "visible";
  bonusDiv.style.transition = "0.3s ease";
  bonusDiv.style.fontSize = "150px";
  bonusDiv.style.opacity = "1";
}
function bonusDisappear(){
  let disappear = setTimeout(function(){
    bonusDiv.style.transition = "1s ease";
    bonusDiv.style.opacity = "0";
    bonusDiv.style.visibility = "hidden";
  }, 200);
  let changeFont = setTimeout(function(){
    bonusDiv.style.fontSize = "50px";
  }, 500);
}




document.addEventListener("DOMContentLoaded", function(){

  //REMOVE HELLO SCREEN
  helloMsg.addEventListener('click', function(){
    helloScreenLeft.style.transition = "3s ease";
    helloScreenLeft.style.width = "0";
    helloScreenLeft.style.opacity= "0";
    helloScreenLeft.style.visibility = "hidden";
    helloScreenRight.style.transition = "3s ease";
    helloScreenRight.style.width = "0"
    helloScreenRight.style.opacity= "0";
    helloScreenRight.style.visibility = "hidden";
    nextRound.innerText = `Next round`;
  })

  // CREATE NEW GAME AND GENERATE FIRST ROUND
  theGame = new TheGame();
  theGame.generateRound(Math.round(Math.random() * roundsDatabase.length-1));
  let map = new google.maps.Map(document.querySelector('.map'), {
    center: {lat: 0, lng: 0},
    zoom: 2,
    zoomControl: false
  });
  //COUNTRY FORM
  formCountry.addEventListener('submit', function(e){
    e.preventDefault();
    let formCountryVal = formCountry.querySelector('input').value;

    if(formCountry.className != 'invisible') {
      let location = theGame.rounds[theGame.rounds.length-1].address;
      fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
      .then(res => res.json()
      .then(res => {
        if(checkCountry(formCountryVal, res) === true){
          switchToCity();
          actualCountry.innerText = `Country: ${formCountryVal}`;
          countryMultiplier = 1;
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          bonusAppear(1);
          bonusDisappear();
        } else {
          messageDiv.innerText = "You're probably wrong! Try again."
          theGame.rounds[theGame.rounds.length-1].shots--;
          theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          countryMultiplier = 0;
        }
      }))
    }
  })

  //CITY FORM
  formCity.addEventListener('submit', function(e){
    e.preventDefault();
    let formCityVal = formCity.querySelector('input').value;

    if(formCity.className != 'invisible') {
      let location = theGame.rounds[theGame.rounds.length-1].address;
      fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
      .then(res => res.json())
      .then(res => {
        if(checkCity(formCityVal, res) === true){
          switchToStreet();
          actualCity.innerText = `City: ${formCityVal}`;
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          cityMultiplier = 1;
          bonusAppear(1);
          bonusDisappear();
        } else {
          messageDiv.innerText = "Nope!"
          theGame.rounds[theGame.rounds.length-1].shots--;
          theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          cityMultiplier = 0;
        }
      })
    }
  })

  //STREET FORM
  formStreet.addEventListener('submit', function(e){
    e.preventDefault();
    let formStreetVal = formStreet.querySelector('input').value;
    if(formStreet.className != 'invisible') {
      let location = theGame.rounds[theGame.rounds.length-1].address;
      fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
      .then(res => res.json())
      .then(res => {
        let lat = res.results[0].geometry.lat;
        let lng = res.results[0].geometry.lng;

        if(checkStreet(formStreetVal, res) === true){
          switchToPin();
          map.setCenter({lat: lat, lng: lng});
          map.setZoom(14);
          actualStreet.innerText = `Street: ${formStreetVal}`;
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          streetMultiplier = 1;
          bonusAppear(1);
          bonusDisappear();
        } else {
          theGame.rounds[theGame.rounds.length-1].shots--;
          theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          messageDiv.innerText = "Try again!";
          streetMultiplier = 0;
        }
      })
    }
  })

  //HANDLE CLICK ON MAP
  google.maps.event.addListener(map, 'click', function(event) {
    if(markers.length == 0){
      placeMarker(event.latLng);


    let location = theGame.rounds[theGame.rounds.length-1].address;
    fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
    .then(res => res.json())
    .then(res => {
      theGame.rounds[theGame.rounds.length-1].shots--;
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

      //END ROUND BUTTON SLIDE IN
      guessButton.style.transition = "0.5s ease";
      guessButton.style.left = "30px";

      //CHECK DISTANCE ERROR
      let origin1 = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      let origin2 = new google.maps.LatLng(res.results[0].geometry.lat, res.results[0].geometry.lng);
      if(calculateDistance(origin1, origin2) < 50){
        theGame.rounds[theGame.rounds.length-1].multiplier = theGame.rounds[theGame.rounds.length-1].multiplier + 2;
        pinMultiplier = 2;
        bonusAppear(2);
        bonusDisappear();
      } else {
        pinMultiplier = 0;
      }
      theGame.rounds[theGame.rounds.length-1].distanceError = calculateDistance(origin1, origin2);
    })
  }
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
  }
  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }


  //HANDLE MOVE TO START BUTTON
  moveToStart.addEventListener('click', function(){
    let location = theGame.rounds[theGame.rounds.length-1].address;
    fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
    .then(res => res.json()
    .then(res => {
      let lat = res.results[0].geometry.lat;
      let lng = res.results[0].geometry.lng;
      theGame.rounds[theGame.rounds.length-1].initStreetView(lat,lng);
    }))
  })

  //SKIP PRECISION LEVEL
  for (var i = 0; i < skipButton.length; i++) {
    skipButton[i].addEventListener('click', function(){
      let location = theGame.rounds[theGame.rounds.length-1].address;
      console.log(location);
      fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
      .then(res => res.json())
      .then(res => {

        let lat = res.results[0].geometry.lat;
        let lng = res.results[0].geometry.lng;

        if(!formCountry.classList.contains('invisible')){
          switchToCity();
          actualCountry.innerText = `Country: ${res.results[0].components.country}`;
        }
        else if(!formCity.classList.contains('invisible')){
          switchToStreet();
          if(res.results[0].components.city === undefined){
            if(res.results[0].components.town === undefined){
              actualCity.innerText = `City: ${res.results[0].components.state}`;
            } else {
              actualCity.innerText = `City: ${res.results[0].components.town}`;
            }
          } else {
            actualCity.innerText = `City: ${res.results[0].components.city}`;
          }
        }
        else if(!formStreet.classList.contains('invisible')){
          switchToPin();
          map.setCenter({lat: lat, lng: lng});
          map.setZoom(14);
          actualStreet.innerText = `Street: ${res.results[0].formatted.split(",")[0]}`;
        }
      })

    })
  }


  //"THIS IS THE PLACE!" BUTTON
  guessButton.addEventListener('click', function(){

    //RESET TEXT IN ROUND SUMMARY
    multipliersSpan.innerText = "";
    countryMultiplierLi.innerText = "";
    cityMultiplierLi.innerText = "";
    streetMultiplierLi.innerText = "";
    pinMultiplierLi.innerText = "";

    //CALCULATE ROUND SCORE
    let startScore = theGame.rounds[theGame.rounds.length-1].roundScore;
    let error = theGame.rounds[theGame.rounds.length-1].distanceError;
    let multiplier = theGame.rounds[theGame.rounds.length-1].multiplier;
    theGame.rounds[theGame.rounds.length-1].roundScore = getRoundScore(startScore, error, multiplier);
    theGame.gameScore += theGame.rounds[theGame.rounds.length-1].roundScore;

    //APPLY TEXT TO ROUND SUMMARY
    if(theGame.rounds[theGame.rounds.length-1].roundScore > 200) {
      errorHeader.innerText = `Error: ${error.toFixed(1)}m`
      scoreSpan.innerText = `${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      countryMultiplierLi.innerText = `Country: +${countryMultiplier}`;
      cityMultiplierLi.innerText = `City: +${cityMultiplier}`;
      streetMultiplierLi.innerText = `Street: +${streetMultiplier}`;
      pinMultiplierLi.innerText = `Pin(error must be < 50m): +${pinMultiplier}`;
    } else {
      scoreSpan.innerText = `only ${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      multipliersSpan.innerText = `NONE!

        Distance error too big!

        ${error.toFixed(1)} meters.`;
    }

    //SHOW ROUND SUMMARY AND HIDE MAP
    roundScoreDiv.style.visibility = "visible";
    roundScoreDiv.style.transition = "3s ease";
    roundScoreDiv.style.opacity = "1";

    if(theGame.rounds.length === 5){
      nextRound.innerText = `Summary`;
    }

    mapDiv.style.transition = "0.5s ease";
    mapDiv.style.left = "-700px";
    guessButton.style.transition = "1s ease";
    guessButton.style.left = "-700px";
  });


  //MAP OPACITY CHANGERS
  mapDiv.addEventListener('mouseenter', function(){
    this.style.opacity = "1";
  })
  streetViewDiv.addEventListener('click', function(){
    mapDiv.style.opacity = "0.4";
  })


  //NEXT ROUND BUTTON
  nextRound.addEventListener('click', function(){
    shotsDiv.classList.remove('invisible');
    shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
    messageDiv.innerText = "Guess the country first";
    formStreet.classList.add('invisible');
    formCity.classList.add('invisible');
    formCountry.classList.remove('invisible');
    mapDiv.style.transition = "1s ease";
    mapDiv.style.left = "-700px";
    guessButton.style.transition = "1s ease";
    guessButton.style.left = "-700px";
    deleteMarkers();
    map.setCenter(new google.maps.LatLng(0, 0));
    roundScoreDiv.style.transition = "1s ease";
    roundScoreDiv.style.opacity = "0";
    roundScoreDiv.style.visibility = "hidden";
    formStreet.querySelector('input').removeAttribute("disabled");
    formStreet.querySelector('button').removeAttribute("disabled");
    formStreet.querySelector('.skip-button').removeAttribute("disabled");
    formCountry.querySelector('input').value = "";
    formCity.querySelector('input').value = "";
    formStreet.querySelector('input').value = "";
    actualCountry.innerText = "Country:";
    actualCity.innerText = "City:";
    actualStreet.innerText = "Street:";
    errorHeader.innerText = "";

    randomRound = generateRandomNumber(0, roundsDatabase.length-1);

    if(theGame.rounds.length === 5){
      helloScreenLeft.style.transition = "1.5s ease";
      helloScreenLeft.style.width = "50vw";
      helloScreenLeft.style.opacity= "1";
      helloScreenLeft.style.visibility = "visible";
      helloScreenRight.style.transition = "1.5s ease";
      helloScreenRight.style.width = "50vw";
      helloScreenRight.style.opacity= "1";
      helloScreenRight.style.visibility = "visible";

      setTimeout(function(){
        console.log('hi');
        theGame = new TheGame();
        theGame.generateRound(Math.round(Math.random() * roundsDatabase.length-1));
      }, 2000);
    } else {
      theGame.generateRound(randomRound);
    }
    console.log(theGame.rounds);
    console.log("theGame.rounds.length: ",theGame.rounds.length);
    console.log(theGame.gameScore);
  })




})
