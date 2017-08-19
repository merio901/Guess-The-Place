import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { checkCountry, checkCity, checkStreet } from './src/js/checkers.js';
import { roundsDatabase } from './src/js/roundsDatabase.js';
import { Round } from './src/js/round.js';
import { calculateDistance, getRoundScore } from './src/js/calculate.js';


const START_SCORE = 1000;

let theGame;
let markers = [];

let countryMultiplier;
let cityMultiplier;
let streetMultiplier;
let pinMultiplier;

let countryMultiplierLi = document.querySelector('.country-multiplier');
let cityMultiplierLi = document.querySelector('.city-multiplier');
let streetMultiplierLi = document.querySelector('.street-multiplier');
let pinMultiplierLi = document.querySelector('.pin-multiplier');
let multipliersSpan = document.querySelector('.multipliers h3 span');

let mapDiv = document.querySelector('.map');
let streetViewDiv = document.querySelector('.street-view');
let skipRound = document.querySelectorAll('.skip-round');
let guessButton = document.querySelector('.guess-place');
let formCountry = document.querySelector('.form-country');
let formCity = document.querySelector('.form-city');
let formStreet = document.querySelector('.form-street');
let messageDiv = document.querySelector('.message');
let shotsDiv = document.querySelector('.shots');
let scoreSpan = document.querySelector('.points');
let roundScoreDiv = document.querySelector('.round-score');


document.addEventListener("DOMContentLoaded", function(){

  // CREATE NEW GAME AND GENERATE FIRST ROUND
  theGame = new TheGame();
  theGame.generateRound(theGame.rounds.length);
  let map = new google.maps.Map(document.querySelector('.map'), {
    center: {lat: 0, lng: 0},
    zoom: 2
  });
  //COUNTRY FORM
  formCountry.addEventListener('submit', function(e){
    e.preventDefault();
    let formCountryVal = document.querySelector('.location-country').value;

    if(formCountry.className != 'invisible') {
      let location = roundsDatabase[theGame.rounds.length-1].location;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
      .then(res => res.json()
      .then(res => {
        if(checkCountry(formCountryVal, res) === true){
          formCountry.classList.add('invisible');
          formCity.classList.remove('invisible');
          messageDiv.innerText = "Good job! Try guessing city now.";
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          countryMultiplier = 1;
        } else {
          messageDiv.innerText = "You're probably wrong! Try again."
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          countryMultiplier = 0;
        }
      }))
    }
  })

  //CITY FORM
  formCity.addEventListener('submit', function(e){
    e.preventDefault();
    let formCityVal = document.querySelector('.location-city').value;

    if(formCity.className != 'invisible') {
      let location = roundsDatabase[theGame.rounds.length-1].location;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
      .then(res => res.json())
      .then(res => {
        if(checkCity(formCityVal, res) === true){
          theGame.multiplier++;
          formCity.classList.add('invisible');
          formStreet.classList.remove('invisible');
          messageDiv.innerText = "Nice! Time to guess the street."
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          cityMultiplier = 1;
        } else {
          messageDiv.innerText = "Nope!"
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          cityMultiplier = 0;
        }
      })
    }
  })

  //STREET FORM
  formStreet.addEventListener('submit', function(e){
    e.preventDefault();
    let formStreetVal = document.querySelector('.location-street').value;
    if(formStreet.className != 'invisible') {
      let location = roundsDatabase[theGame.rounds.length-1].location;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
      .then(res => res.json())
      .then(res => {
        if(checkStreet(formStreetVal, res) === true){
          theGame.multiplier++;
          messageDiv.innerText = "Great! Now make a guess on map where exactly are you."
          messageDiv.style.fontSize = "30px";
          shotsDiv.classList.add('invisible');
          theGame.rounds[theGame.rounds.length-1].multiplier++;
          streetMultiplier = 1;

          // MAP AND BUTTON SLIDE IN
          mapDiv.style.transition = "0.5s ease";
          mapDiv.style.left = "30px";

        } else {
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          messageDiv.innerText = "Try again!";
          streetMultiplier = 0;
        }
      })
    }
  })

  //HANDLE CLICK ON MAP
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    let location = roundsDatabase[theGame.rounds.length-1].location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
    .then(res => res.json())
    .then(res => {

      //END ROUND BUTTON SLIDE IN
      guessButton.style.transition = "0.5s ease";
      guessButton.style.left = "30px";

      //CHECK DISTANCE ERROR
      let origin1 = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      let origin2 = new google.maps.LatLng(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng);
      if(calculateDistance(origin1, origin2) < 50){
        theGame.rounds[theGame.rounds.length-1].multiplier = theGame.rounds[theGame.rounds.length-1].multiplier + 2;
        pinMultiplier = 2;
      } else {
        pinMultiplier = 0;
      }
      theGame.rounds[theGame.rounds.length-1].distanceError = calculateDistance(origin1, origin2);
    })
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

  // TODO:
  //SKIP PRECISION LEVEL





  //"THIS IS THE PLACE!"
  guessButton.addEventListener('click', function(){

    //RESET TEXT IN ROUND SUMMARY
    multipliersSpan.innerText = "";
    countryMultiplierLi.innerText = "";
    cityMultiplierLi.innerText = "";
    streetMultiplierLi.innerText = "";
    pinMultiplierLi.innerText = "";

    //CALCULATE ROUND SCORE
    let error = theGame.rounds[theGame.rounds.length-1].distanceError;
    let multiplier = theGame.rounds[theGame.rounds.length-1].multiplier;
    theGame.rounds[theGame.rounds.length-1].roundScore = getRoundScore(START_SCORE, error, multiplier);
    theGame.gameScore += theGame.rounds[theGame.rounds.length-1].roundScore;

    //APPLY TEXT TO ROUND SUMMARY
    if(theGame.rounds[theGame.rounds.length-1].roundScore > 500) {
      scoreSpan.innerText = `${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      countryMultiplierLi.innerText = `Country: +${countryMultiplier}`;
      cityMultiplierLi.innerText = `City: +${cityMultiplier}`;
      streetMultiplierLi.innerText = `Street: +${streetMultiplier}`;
      pinMultiplierLi.innerText = `Pin: +${pinMultiplier}`;
    } else {
      scoreSpan.innerText = `only ${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      multipliersSpan.innerText = `NONE! Distance error too big!`;
    }

    //SHOW ROUND SUMMARY
    roundScoreDiv.style.visibility = "visible";
    roundScoreDiv.style.transition = "3s ease";
    roundScoreDiv.style.opacity = "1";


  });

  //MAP OPACITY CHANGERS
  mapDiv.addEventListener('mouseenter', function(){
    this.style.opacity = "1";
  })
  streetViewDiv.addEventListener('click', function(){
    mapDiv.style.opacity = "0.4";
  })


  //SKIP ROUND BUTTON (LATER END ROUND BUTTON)
  for(let i=0; i<skipRound.length; i++){
    skipRound[i].addEventListener('click', function(e){
      e.preventDefault();
      theGame.generateRound(theGame.rounds.length);
      console.log(theGame.rounds);
      shotsDiv.classList.remove('invisible');
      console.log(theGame.rounds.length);
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
      map.setZoom(2);
      console.log(theGame.gameScore);
    });
  }



})
