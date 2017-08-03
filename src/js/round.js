import { roundsDatabase } from './roundsDatabase.js';


export class Round {
  constructor(){
  }
  geocode = (nextRound) =>{
    let location = roundsDatabase[nextRound].location;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
    .then(res => res.json())
    .then(res => {
      console.log("Response from API: ",res);

      // CHECK FOR VALID PLACE TO GENERATE MAP AND STREETVIEW
        // if(res.results.length > 0) {
        //   res.results[0].address_components.map((addressComponent)=>{
        //     if(addressComponent.types[0] === "country"){
        //       console.log('Country checked');
        //       count++;
        //     } else if(addressComponent.types[0] === "locality") {
        //       console.log('Locality checked');
        //       count++;
        //     } else if(addressComponent.types[0] === "route") {
        //       console.log('Route checked');
        //       count++;
        //     }
        //   })
        // }

        // GET GEOMETRY THEN INIT MAP AND STREETVIEW
        let lat = res.results[0].geometry.location.lat;
        let lng = res.results[0].geometry.location.lng;
        this.initStreetView(lat, lng);
        this.initMap(lat, lng);


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
  initMap = (lat, lng) =>{
    let map = new google.maps.Map(document.querySelector('.map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });
  }

}
