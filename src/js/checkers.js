export function checkCountry(countryToCheck, response){
  let it;
  let address = [];
  address = response.results[0].formatted_address.split(",");

  if(address[address.length-1].indexOf(countryToCheck) > -1){
    console.log('Country checked');
    it = true;
  } else {
    it = false;
  }
  return it;
}

export function checkCity(cityToCheck, response){
  let it;

  if(response.results[0].formatted_address.indexOf(cityToCheck) > 0){
    console.log('City checked');
    it = true;
  } else {
    it = false;
  }
  return it;
}

export function checkStreet(streetToCheck, response){
  let it;
  let address = [];
  address = response.results[0].formatted_address.split(",");

  if(address[0].indexOf(streetToCheck) > -1){
    console.log('Street checked');
    it = true;
  } else {
    it = false;
  }
  return it;
}
