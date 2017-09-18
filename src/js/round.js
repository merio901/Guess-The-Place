import { roundsDatabase } from './roundsDatabase.js';
import { generateRandomNumber } from './calculate.js';

export class Round {
  constructor(){
    this.shots = 10;
    this.roundScore = 1000;
    this.multiplier = 1;
    this.distanceError = 0;
    this.address = "";
  }
  geocode = (nextRound) =>{
    // for(let i = 0; i<roundsDatabase.length; i++){

    this.address = roundsDatabase[nextRound].location;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.address}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
    .then(res => res.json())
    .then(res => {
      // console.log("Length: " + roundsDatabase.length + " Res number: " + i, res.results[0].components, res.results[0].formatted);

      // GET GEOMETRY THEN INIT STREETVIEW
      let lat = res.results[0].geometry.lat;
      let lng = res.results[0].geometry.lng;
      this.initStreetView(lat, lng);

    })
    .catch(err => {
      console.log(err);
    })
  // }
  }
  initStreetView = (lat, lng) =>{
    var location = {lat: lat, lng: lng};
    var panorama = new google.maps.StreetViewPanorama(
      document.querySelector('.street-view'), {
        position: location,
        addressControl: false,
        showRoadLabels: false
      });
  }
}
