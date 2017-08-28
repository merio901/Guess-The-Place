export function checkCountry(countryToCheck, response){
  let it;
  let address = [];
  address = response.results[0].formatted.split(",");

  if(address[address.length-1].indexOf(countryToCheck) > 0){
    console.log('Country checked');
    it = true;
  } else {
    it = false;
  }
  return it;
}

export function checkCity(cityToCheck, response){
  let it;

  if(response.results[0].formatted.indexOf(cityToCheck) > 0){
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
  address = response.results[0].formatted.split(",");
  console.log(address[0]);

  if(streetToCheck){
    if(address[0].indexOf(streetToCheck) == 0){
      console.log('Street checked');
      it = true;
    } else {
      it = false;
    }
  } else {
    it = false;
  }
  return it;
}
