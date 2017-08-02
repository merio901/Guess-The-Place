export class TheGame{
  constructor(){
    this.rounds = [];

  }
  getRoundCount = () =>{
    return this.roundCount;
  }
  initMap(lat, lng) {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });
  }

}
