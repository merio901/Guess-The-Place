import { roundsDatabase } from './roundsDatabase.js';


export class Round {
  constructor(){
    this.shots = 10;
  }
  geocode = (nextRound) =>{
    let location = roundsDatabase[nextRound].location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&libraries=places`)
    .then(res => res.json())
    .then(res => {
      console.log("Response from API: ", res);

      // GET GEOMETRY THEN INIT STREETVIEW
      let lat = res.results[0].geometry.location.lat;
      let lng = res.results[0].geometry.location.lng;
      this.initStreetView(lat, lng);

    })
    .catch(err => {
      console.log(err);
    })
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
