import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { checkCountry, checkCity, checkStreet } from './src/js/checkers.js';
import { roundsDatabase } from './src/js/roundsDatabase.js';
import { Round } from './src/js/round.js';
import { calculateDistance } from './src/js/calculate.js';


let theGame;
let markers = [];
let skipRound = document.querySelectorAll('.skip-round');
let formCountry = document.querySelector('.form-country');
let formCity = document.querySelector('.form-city');
let formStreet = document.querySelector('.form-street');
let messageDiv = document.querySelector('.message');
let shotsDiv = document.querySelector('.shots');
let mapDiv = document.querySelector('.map');



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
        console.log(res);
        if(checkCountry(formCountryVal, res) === true){
          theGame.multiplier++;
          console.log(theGame.multiplier);
          formCountry.classList.add('invisible');
          formCity.classList.remove('invisible');
          messageDiv.innerText = "Good job! Try guessing city now."
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`
        } else {
          messageDiv.innerText = "You're probably wrong! Try again."
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`
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
        console.log(checkCity(formCityVal,res));
        if(checkCity(formCityVal, res) === true){
          theGame.multiplier++;
          formCity.classList.add('invisible');
          formStreet.classList.remove('invisible');
          messageDiv.innerText = "Nice! Time to guess the street."
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`
        } else {
          messageDiv.innerText = "Nope!"
          theGame.rounds[theGame.rounds.length-1].shots--;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`
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
        console.log(checkStreet(formStreetVal,res));
        if(checkStreet(formStreetVal, res) === true){
          theGame.multiplier++;
          messageDiv.innerText = "Great! Now make a guess on map where exactly are you."
          messageDiv.style.fontSize = "30px";
          shotsDiv.classList.add('invisible');
          mapDiv.style.transition = "1s ease";
          mapDiv.style.left = "30px";

          // SHOW MAP
        } else {
          messageDiv.innerText = "Try again!"
        }
      })
    }
  })


  //SKIP ROUND BUTTON
  for(let i=0; i<skipRound.length; i++){
    skipRound[i].addEventListener('click', function(e){
      e.preventDefault();
      theGame.generateRound(theGame.rounds.length);
      console.log(theGame.rounds);
      console.log(theGame.rounds.length);
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
      messageDiv.innerText = "Guess the country first";
      formStreet.classList.add('invisible');
      formCity.classList.add('invisible');
      formCountry.classList.remove('invisible');
      deleteMarkers();
      map.setCenter(new google.maps.LatLng(0, 0));
      map.setZoom(2);
    })
  }
  //HANDLE CLICK ON MAP
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    let location = roundsDatabase[theGame.rounds.length-1].location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
    .then(res => res.json())
    .then(res => {
      let origin1 = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      let origin2 = new google.maps.LatLng(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng);
      calculateDistance(origin1, origin2);
      if(calculateDistance(origin1, origin2) < 100){
        console.log('hi');
      }
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

})
