export function checkCountry(countryToCheck, response){
  let it;
  response.results[0].address_components.map((addressComponent)=>{
      if(addressComponent.long_name === countryToCheck){
        console.log('Country checked');
        it = true;
      } else {
        it = false;
      }
    })
    return it;
}
export function checkCity(cityToCheck, response){
  response.results[0].address_components.map((addressComponent)=>{
      if(addressComponent.long_name === cityToCheck){
        console.log('City checked');
      }
    })
}
