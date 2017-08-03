export function checkCountry(countryToCheck, response){
  response.results[0].address_components.map((addressComponent)=>{
      if(addressComponent.long_name === countryToCheck){
        console.log('Country checked');
        let it = true;
        return it;
      } else {
        return false;
      }
    })
}
export function checkCity(cityToCheck, response){
  response.results[0].address_components.map((addressComponent)=>{
      if(addressComponent.long_name === cityToCheck){
        console.log('City checked');
      }
    })
}
