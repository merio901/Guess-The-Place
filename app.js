import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { Round } from './src/js/round.js';


document.addEventListener("DOMContentLoaded", function(){


var theGame = new TheGame();
console.log(theGame.rounds);

var roundCount = 0;
var skipRound = document.querySelector('.skip-round');

skipRound.addEventListener('click', function(e){
  e.preventDefault();
  theGame.generateRound(roundCount);
  console.log(theGame.rounds);
  console.log(theGame.rounds.length);
  roundCount++;

  if(theGame.rounds.length == 3){
    console.log("STYYYKA PANIE");
  }
})

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
