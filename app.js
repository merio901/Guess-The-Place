import './src/styles/main.css';



document.addEventListener("DOMContentLoaded", function(){

  function initMap(lat, lng) {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat, lng: lng},
      zoom: 16
    });
  }


  let form = document.querySelector('#form');
  form.addEventListener('submit', geocode);


  function geocode(e){
    e.preventDefault();
    let location = document.getElementById('location-input').value;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      //Formatted address
      let formattedAddress = res.results[0].formatted_address;
      let formattedAddressOutput = `
        <ul class="list-group">
          <li class="list-group-item">${formattedAddress}</li>
        </ul>
      `;
      //Address Components
      let addressComponents = res.results[0].address_components;
      let addressComponentsOutput = '<ul class="list-group">';
      for(let i=0; i<addressComponents.length; i++){
        addressComponentsOutput += `
          <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
        `;
      }
      addressComponentsOutput += '</ul>';

      //Get Geometry
      let lat = res.results[0].geometry.location.lat;
      let lng = res.results[0].geometry.location.lng;
      initMap(lat, lng)
      let latLngOutput = `
        <ul class="list-group">
          <li class="list-group-item"><strong>Lat itude: </strong>${lat}</li>
          <li class="list-group-item"><strong>Longtitude: </strong>${lng}</li>
        </ul>
      `;
      //Output to App
      document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      document.getElementById('address-components').innerHTML = addressComponentsOutput;
      document.getElementById('geometry').innerHTML = latLngOutput;
    })
    .catch(err => {
      console.log(err);
    })
  }


})
