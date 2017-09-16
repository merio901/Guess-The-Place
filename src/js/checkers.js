export function checkCountry(countryToCheck, response){
  let it;
  let address = [];
  address = response.results[0].formatted.split(",");

  if(address[address.length-1].indexOf(countryToCheck) > 0){
    it = true;
  } else {
    it = false;
  }
  return it;
}

export function checkCity(cityToCheck, response){
  let it;

  if(response.results[0].formatted.indexOf(cityToCheck) > 0){
    it = true;
  } else {
    it = false;
  }
  return it;
}

export function checkStreet(streetToCheck, response){
  let it;
  let address = [];
  address = response.results[0].formatted.split(",");

  if(streetToCheck){

    if(response.results[0].components.road === undefined) {
      if(address[0].indexOf(streetToCheck) == 0){
        it = true;
      } else {
        it = false;
      }
    } else {
      if(response.results[0].components.road.indexOf(streetToCheck) == 0) {
        it = true;
      } else {
        it = false;
      }
    }
  } else {
    it = false;
  }
  return it;
}
