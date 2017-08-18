export function checkCountry(countryToCheck, response){
  let it;
  if(response.results[0].formatted_address.indexOf(countryToCheck) > 0){
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
  if(response.results[0].formatted_address.indexOf(streetToCheck) >= 0){
    console.log('Street checked');
    it = true;
  } else {
    it = false;
  }
  return it;
}
