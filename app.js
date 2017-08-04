import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { checkCountry, checkCity, checkStreet } from './src/js/checkers.js';
import { roundsDatabase } from './src/js/roundsDatabase.js';



document.addEventListener("DOMContentLoaded", function(){

  // CREATE NEW GAME AND GENERATE FIRST ROUND
  let theGame = new TheGame();
  theGame.generateRound(theGame.rounds.length);

  let skipRound = document.querySelectorAll('.skip-round');
  let formCountry = document.querySelector('.form-country');
  let formCity = document.querySelector('.form-city');
  let formStreet = document.querySelector('.form-street');
  let messageDiv = document.querySelector('.message');
  let shotsDiv = document.querySelector('.shots');


  //CHECK COUNTRY
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
          formCountry.classList.add('invisible');
          formCity.classList.remove('invisible');
          messageDiv.innerText = "Good job! Try guessing city now."
          theGame.shots--;
          shotsDiv.innerText = `Shots left: ${theGame.shots}`
        } else {
          messageDiv.innerText = "You're probably wrong! Try again."
          theGame.shots--;
          shotsDiv.innerText = `Shots left: ${theGame.shots}`
        }
      }))
    }
  })

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
          formCity.classList.add('invisible');
          formStreet.classList.remove('invisible');
          messageDiv.innerText = "Nice! Time to guess the street."
          theGame.shots--;
          shotsDiv.innerText = `Shots left: ${theGame.shots}`
        } else {
          messageDiv.innerText = "Nope!"
          theGame.shots--;
          shotsDiv.innerText = `Shots left: ${theGame.shots}`
        }
      })
    }
  })


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
          console.log('hi');
          messageDiv.innerText = "Great! Now make a guess on map where exactly are you."
          messageDiv.style.fontSize = "30px";
          shotsDiv.classList.add('invisible');
        } else {
          messageDiv.innerText = "Try again!"
        }
      })
    }
  })

  for(let i=0; i<skipRound.length; i++){
    skipRound[i].addEventListener('click', function(e){
      e.preventDefault();
      theGame.generateRound(theGame.rounds.length);
      console.log(theGame.rounds);
      console.log(theGame.rounds.length);
      theGame.shots=10;
      shotsDiv.innerText = `Shots left: ${theGame.shots}`;
      messageDiv.innerText = "Guess the country first";
      formStreet.classList.add('invisible');
      formCity.classList.add('invisible');
      formCountry.classList.remove('invisible');
    })
  }

// var skipper = document.querySelector('.skipper');
//
//
// skipper.addEventListener("onClick", function(e){
//   e.preventDefault();
//   console.log('hi');
// })


// var map;
// var panorama;
//
//
// var startingLat = parseFloat((Math.random() * 180 - 90).toFixed(6));
// var startingLng = parseFloat((Math.random() * 180 - 90).toFixed(6));
// console.log(startingLng);
// console.log(startingLat);
//
//
// var location = {lat: startingLat, lng: startingLng};
//
// function initMap() {
//   var prosta = location;
//   var sv = new google.maps.StreetViewService();
//   panorama = new google.maps.StreetViewPanorama(document.querySelector('.street-view'), {
//     disableDefaultUI: true,
//     showRoadLabels: false
//   });
//
//   // Set up the map.
//   map = new google.maps.Map(document.querySelector('.map'), {
//     center: prosta,
//     zoom: 16,
//     streetViewControl: false
//   });
//
//   // Set the initial Street View camera to the center of the map
//   sv.getPanorama({location: prosta, radius: 50}, processSVData);
//
//
//   // Look for a nearby Street View panorama when the map is clicked.
//   // getPanoramaByLocation will return the nearest pano when the
//   // given radius is 50 meters or less.
//
//   // map.addListener('click', function(event) {
//   //   sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
//   // });
// }
//
// function processSVData(data, status) {
//   console.log(data);
//   if (status === 'OK') {
//     // var marker = new google.maps.Marker({
//     //   position: data.location.latLng,
//     //   map: map,
//     //   title: data.location.description
//     // });
//
//     panorama.setPano(data.location.pano);
//
//
//     //
//     // marker.addListener('click', function() {
//     //   var markerPanoID = data.location.pano;
//     //   // Set the Pano to use the passed panoID.
//     //   panorama.setPano(markerPanoID);
//     //   panorama.setPov({
//     //     heading: 270,
//     //     pitch: 0
//     //   });
//     //   panorama.setVisible(true);
//     // });
//   } else {
//     console.error('Street View data not found for this location.');
//   }
// }
//
// initMap();
  //

  // let form = document.querySelector('#form');
  // form.addEventListener('submit', geocode);


  // function geocode(e){
  //   e.preventDefault();
  //   let location = document.getElementById('location-input').value;
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log(res);
  //     //Formatted address
  //     let formattedAddress = res.results[0].formatted_address;
  //     let formattedAddressOutput = `
  //       <ul class="list-group">
  //         <li class="list-group-item">${formattedAddress}</li>
  //       </ul>
  //     `;
  //     //Address Components
  //     let addressComponents = res.results[0].address_components;
  //     let addressComponentsOutput = '<ul class="list-group">';
  //     for(let i=0; i<addressComponents.length; i++){
  //       addressComponentsOutput += `
  //         <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
  //       `;
  //     }
  //     addressComponentsOutput += '</ul>';
  //
  //     //Get Geometry
  //     let lat = res.results[0].geometry.location.lat;
  //     let lng = res.results[0].geometry.location.lng;
  //     // initMap(lat, lng);
  //     initializeStreetView(lat, lng);
  //     let latLngOutput = `
  //       <ul class="list-group">
  //         <li class="list-group-item"><strong>Lat itude: </strong>${lat}</li>
  //         <li class="list-group-item"><strong>Longtitude: </strong>${lng}</li>
  //       </ul>
  //     `;
  //     //Output to App
  //     document.querySelector('.formatted-address').innerHTML = formattedAddressOutput;
  //     document.querySelector('.address-components').innerHTML = addressComponentsOutput;
  //     document.querySelector('.geometry').innerHTML = latLngOutput;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }






})
