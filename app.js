import './src/styles/main.css';
import { TheGame } from './src/js/gameCreator.js';
import { checkCountry, checkCity, checkStreet } from './src/js/checkers.js';
import { roundsDatabase } from './src/js/roundsDatabase.js';
import { Round } from './src/js/round.js';
import { calculateDistance, getRoundScore, generateRandomNumber } from './src/js/calculate.js';




let theGame;
let markers = [];
let randomRound = generateRandomNumber(0, roundsDatabase.length-1);

let actualCountry = document.querySelector('.actual-country');
let actualCity = document.querySelector('.actual-city');
let actualStreet = document.querySelector('.actual-street');
let gameScore = document.querySelector('.game__score');
let gameRounds = document.querySelector('.game__rounds');

let countryMultiplier;
let cityMultiplier;
let streetMultiplier;
let pinMultiplier;
let countryMultiplierLi = document.querySelector('.country-multiplier');
let cityMultiplierLi = document.querySelector('.city-multiplier');
let streetMultiplierLi = document.querySelector('.street-multiplier');
let pinMultiplierLi = document.querySelector('.pin-multiplier');
let multipliersSpan = document.querySelector('.multipliers h3 span');

let helloScreenLeft = document.querySelector('.hello-screen__left');
let helloScreenRight = document.querySelector('.hello-screen__right');
let helloScreenTop = document.querySelector('.hello-screen__top');
let summaryBox = document.querySelector('.summary-box');
let rulesBox = document.querySelector('.rules-box');
let rulesButton = document.querySelector('.rules-button');
let startGame = document.querySelector('.start-game');
let mapDiv = document.querySelector('.map');
let streetViewDiv = document.querySelector('.street-view');
let skipButton = document.querySelectorAll('.skip-button');
let nextRound = document.querySelector('.next-round');
let guessButton = document.querySelector('.guess-place');
let moveToStart = document.querySelector('.restart');
let formCountry = document.querySelector('.form-country');
let formCity = document.querySelector('.form-city');
let formStreet = document.querySelector('.form-street');
let messageDiv = document.querySelector('.message');
let shotsDiv = document.querySelector('.shots');
let scoreSpan = document.querySelector('.points');
let roundScoreDiv = document.querySelector('.round-score');
let errorHeader = document.querySelector('.error');
let bonusDiv = document.querySelector('.bonus');

let highscoresWrapper = document.querySelector('.highscores-wrapper');
let cancelHighscoresForm = document.querySelector('.highscores-form__buttons--cancel');
let submitHighscoresForm = document.querySelector('.highscores-form__buttons--submit');
let highscoresForm = document.querySelector('.highscores-form');
let highscoresName = document.getElementById('name');
let highscoresButton = document.querySelector('.highscores-button');
let highscoresListBox = document.querySelector('.highscores-box');
let highscoresList = document.querySelector('.highscores-list');

function switchToCity(){
  formCountry.classList.add('invisible');
  formCity.classList.remove('invisible');

  if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
    messageDiv.innerText = "You're out of shots. Use this last chance to make a guess."
  } else {
    messageDiv.innerText = "Try guessing city now.";
  }
  countryMultiplier = 0;
}
function switchToStreet(){
  formCity.classList.add('invisible');
  formStreet.classList.remove('invisible');
  if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
    messageDiv.innerText = "You're out of shots. Use this last chance to make a guess."
  } else {
    messageDiv.innerText = "Time to guess the street."
  }
  cityMultiplier = 0;
}
function switchToPin(){
  if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
    messageDiv.innerText = "You're out of shots. Use this last chance to make a guess."
  } else {
    messageDiv.innerText = "Now make a guess on map where exactly are you."
  }

  // MAP AND BUTTON SLIDE IN
  mapDiv.style.transition = "0.5s ease";
  mapDiv.style.left = "30px";
  streetMultiplier = 0;
  formStreet.querySelector('input').setAttribute("disabled", "true");
  formStreet.querySelector('button').setAttribute("disabled", "true");
  formStreet.querySelector('.skip-button').setAttribute("disabled", "true");

}
function bonusAppear(bonus){
  bonusDiv.innerText = `+${bonus}`;
  bonusDiv.style.visibility = "visible";
  bonusDiv.style.transition = "0.3s ease";
  bonusDiv.style.fontSize = "150px";
  bonusDiv.style.opacity = "1";
}
function bonusDisappear(){
  let disappear = setTimeout(function(){
    bonusDiv.style.transition = "1s ease";
    bonusDiv.style.opacity = "0";
    bonusDiv.style.visibility = "hidden";
  }, 200);
  let changeFont = setTimeout(function(){
    bonusDiv.style.fontSize = "50px";
  }, 500);
}


//FIREBASE HIGHSCORES

  const config = {
    apiKey: "AIzaSyCliOopBg7ZTXPgP5JhLAYWRV4HRtwL9Ww",
    authDomain: "guess-the-place-1501421295034.firebaseapp.com",
    databaseURL: "https://guess-the-place-1501421295034.firebaseio.com",
    projectId: "guess-the-place-1501421295034",
    storageBucket: "guess-the-place-1501421295034.appspot.com",
    messagingSenderId: "237364089511"
  };

  //INITLIALIZE FIREBASE
  firebase.initializeApp(config);
  const myFBref = firebase.database().ref();


  function sortScore(myList) {
    var elements = Array.from(highscoresList.children);
    elements.sort(function (a, b) {
      let va = parseInt(a.getAttribute('data-id'));
      let vb = parseInt(b.getAttribute('data-id'));
      return vb - va;
    });
    elements.forEach(function(nextLi){
      highscoresList.appendChild(nextLi);
    })
  }

  //GET RECORDS FROM DATABASE AND PUT INT INTO LIST
  myFBref.orderByChild("score").limitToLast(10).on("child_added", function(data) {
    //FILL TAB WITH ASCENDING RECORDS THEN SORT DESCENDING

    highscoresList.innerHTML += `<li data-id=${data.val().score}> ${data.val().name} - ${data.val().score} points.</li>`
    sortScore(highscoresList); //Use sorting list function everytime child is added.

    if(highscoresList.children.length === 11){
      highscoresList.removeChild(highscoresList.childNodes[10]);
    }
  });


  //SEND HIGHSCORE TO DATABASE
  function sendHighScore(score, name){
    let record = {};
    record.score = parseInt(score);
    record.name = name;
    if(record.score != 0) {
      myFBref.push(record);
    }
  }


document.addEventListener("DOMContentLoaded", function(){


  //REMOVE HELLO SCREEN
  startGame.addEventListener('click', function(){
    helloScreenLeft.style.transition = "0.7s ease";
    helloScreenLeft.style.width = "0";
    helloScreenLeft.style.opacity= "0";
    helloScreenLeft.style.visibility = "hidden";
    helloScreenRight.style.transition = "0.7s ease";
    helloScreenRight.style.width = "0"
    helloScreenRight.style.opacity= "0";
    helloScreenRight.style.visibility = "hidden";
    helloScreenTop.style.transition = "0.7s ease";
    helloScreenTop.style.height = "0"
    helloScreenTop.style.opacity= "0";
    helloScreenTop.style.visibility = "hidden";
    nextRound.innerText = `Next round`;
    gameScore.innerText = `Score: 0`;
    gameRounds.innerText = `Round: 1/5`;
  })

  // CREATE NEW GAME AND GENERATE FIRST ROUND
  theGame = new TheGame();
  theGame.generateRound(Math.abs(Math.round(Math.random() * roundsDatabase.length-1)));
  let map = new google.maps.Map(document.querySelector('.map'), {
    center: {lat: 0, lng: 0},
    zoom: 2,
    zoomControl: false
  });

  //COUNTRY FORM
  formCountry.addEventListener('submit', function(e){
    e.preventDefault();
    let formCountryVal = formCountry.querySelector('input').value;
    theGame.rounds[theGame.rounds.length-1].shots--;
    shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

    if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
      theGame.rounds[theGame.rounds.length-1].shots = 0;
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
      formCountry.querySelector('button').setAttribute("disabled", "true");
      switchToPin();
      map.setZoom(2);
    } else {
      if(formCountry.className != 'invisible') {
        let location = theGame.rounds[theGame.rounds.length-1].address;
        fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
        .then(res => res.json()
        .then(res => {
          if(checkCountry(formCountryVal, res) === true){
            switchToCity();
            actualCountry.innerText = `Country: ${formCountryVal}`;
            countryMultiplier = 1;
            theGame.rounds[theGame.rounds.length-1].multiplier++;
            bonusAppear(1);
            bonusDisappear();
          } else {
            messageDiv.innerText = "You're probably wrong! Try again."
            theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
            countryMultiplier = 0;
          }
        }))
      }
    }
  })

  //CITY FORM
  formCity.addEventListener('submit', function(e){
    e.preventDefault();
    let formCityVal = formCity.querySelector('input').value;
    theGame.rounds[theGame.rounds.length-1].shots--;
    shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

    if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
      theGame.rounds[theGame.rounds.length-1].shots = 0;
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
      formCity.querySelector('button').setAttribute("disabled", "true");
      switchToPin();
      map.setZoom(2);
    } else {
      if(formCity.className != 'invisible') {
        let location = theGame.rounds[theGame.rounds.length-1].address;
        fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
        .then(res => res.json())
        .then(res => {
          if(checkCity(formCityVal, res) === true){
            switchToStreet();
            actualCity.innerText = `City: ${formCityVal}`;
            theGame.rounds[theGame.rounds.length-1].multiplier++;
            cityMultiplier = 1;
            bonusAppear(1);
            bonusDisappear();
          } else {
            messageDiv.innerText = "Nope!"
            theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
            cityMultiplier = 0;
          }
        })
      }
    }
  })

  //STREET FORM
  formStreet.addEventListener('submit', function(e){
    e.preventDefault();
    let formStreetVal = formStreet.querySelector('input').value;
    theGame.rounds[theGame.rounds.length-1].shots--;
    shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

    if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
      theGame.rounds[theGame.rounds.length-1].shots = 0;
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
      formStreet.querySelector('button').setAttribute("disabled", "true");
      switchToPin();
      map.setZoom(2);
    } else {
      if(formStreet.className != 'invisible') {
        let location = theGame.rounds[theGame.rounds.length-1].address;
        fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
        .then(res => res.json())
        .then(res => {
          let lat = res.results[0].geometry.lat;
          let lng = res.results[0].geometry.lng;

          if(checkStreet(formStreetVal, res) === true){
            switchToPin();
            map.setCenter({lat: lat, lng: lng});
            map.setZoom(14);
            actualStreet.innerText = `Street: ${formStreetVal}`;
            theGame.rounds[theGame.rounds.length-1].multiplier++;
            streetMultiplier = 1;
            bonusAppear(1);
            bonusDisappear();
          } else {
            theGame.rounds[theGame.rounds.length-1].roundScore -= 10;
            messageDiv.innerText = "Try again!";
            streetMultiplier = 0;
          }
        })
      }
    }
  })

  //HANDLE CLICK ON MAP
  google.maps.event.addListener(map, 'click', function(event) {
    if(markers.length == 0){
      placeMarker(event.latLng);


    let location = theGame.rounds[theGame.rounds.length-1].address;
    fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
    .then(res => res.json())
    .then(res => {
      if(theGame.rounds[theGame.rounds.length-1].shots != 0){
        theGame.rounds[theGame.rounds.length-1].shots--;
      }
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

      //END ROUND BUTTON SLIDE IN
      guessButton.style.transition = "0.5s ease";
      guessButton.style.left = "30px";

      //CHECK DISTANCE ERROR
      let origin1 = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      let origin2 = new google.maps.LatLng(res.results[0].geometry.lat, res.results[0].geometry.lng);
      if(calculateDistance(origin1, origin2) < 50){
        theGame.rounds[theGame.rounds.length-1].multiplier = theGame.rounds[theGame.rounds.length-1].multiplier + 2;
        pinMultiplier = 2;
        bonusAppear(2);
        bonusDisappear();
      } else {
        pinMultiplier = 0;
      }
      theGame.rounds[theGame.rounds.length-1].distanceError = calculateDistance(origin1, origin2);
    })
  }
  });

  function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
  }
  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }


  //HANDLE MOVE TO START BUTTON
  moveToStart.addEventListener('click', function(){
    let location = theGame.rounds[theGame.rounds.length-1].address;
    fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
    .then(res => res.json()
    .then(res => {
      let lat = res.results[0].geometry.lat;
      let lng = res.results[0].geometry.lng;
      theGame.rounds[theGame.rounds.length-1].initStreetView(lat,lng);
    }))
  })

  //SKIP PRECISION LEVEL
  for (var i = 0; i < skipButton.length; i++) {
    skipButton[i].addEventListener('click', function(){
      let location = theGame.rounds[theGame.rounds.length-1].address;
      theGame.rounds[theGame.rounds.length-1].shots--;
      shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;

        fetch(`http://api.opencagedata.com/geocode/v1/json?q=${location}&language=en&limit=1&key=42b21bb9ab0d4b1da3fcdb17ca2ca2a3`)
        .then(res => res.json())
        .then(res => {

          let lat = res.results[0].geometry.lat;
          let lng = res.results[0].geometry.lng;

          if(!formCountry.classList.contains('invisible')){
            switchToCity();
            actualCountry.innerText = `Country: ${res.results[0].components.country}`;
          }
          else if(!formCity.classList.contains('invisible')){
            switchToStreet();
            if(res.results[0].components.city === undefined){
              if(res.results[0].components.town === undefined){
                actualCity.innerText = `City: ${res.results[0].components.state}`;
              } else {
                actualCity.innerText = `City: ${res.results[0].components.town}`;
              }
            } else {
              actualCity.innerText = `City: ${res.results[0].components.city}`;
            }
          }
          else if(!formStreet.classList.contains('invisible')){
            switchToPin();
            map.setCenter({lat: lat, lng: lng});
            map.setZoom(14);
            if(res.results[0].components.road === undefined) {
              actualStreet.innerText = `Street: ${res.results[0].formatted.split(",")[0]}`;
            } else {
              actualStreet.innerText = `Street: ${res.results[0].components.road}`;
            }
          }
        })
        if(theGame.rounds[theGame.rounds.length-1].shots <= 0){
          theGame.rounds[theGame.rounds.length-1].shots = 0;
          shotsDiv.innerText = `Shots left: ${theGame.rounds[theGame.rounds.length-1].shots}`;
          formCountry.querySelector('button').setAttribute("disabled", "true");
          switchToPin();
          map.setZoom(2);
        }

    })
  }


  //"THIS IS THE PLACE!" BUTTON
  guessButton.addEventListener('click', function(){

    //RESET TEXT IN ROUND SUMMARY
    multipliersSpan.innerText = "";
    countryMultiplierLi.innerText = "";
    cityMultiplierLi.innerText = "";
    streetMultiplierLi.innerText = "";
    pinMultiplierLi.innerText = "";

    //CALCULATE ROUND SCORE
    let startScore = theGame.rounds[theGame.rounds.length-1].roundScore;
    let error = theGame.rounds[theGame.rounds.length-1].distanceError;
    let multiplier = theGame.rounds[theGame.rounds.length-1].multiplier;
    theGame.rounds[theGame.rounds.length-1].roundScore = getRoundScore(startScore, error, multiplier);
    theGame.gameScore += theGame.rounds[theGame.rounds.length-1].roundScore;

    //APPLY TEXT TO ROUND SUMMARY
    if(theGame.rounds[theGame.rounds.length-1].roundScore > 200) {
      errorHeader.innerText = `Error: ${error.toFixed(1)}m`
      scoreSpan.innerText = `${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      countryMultiplierLi.innerText = `Country: +${countryMultiplier}`;
      cityMultiplierLi.innerText = `City: +${cityMultiplier}`;
      streetMultiplierLi.innerText = `Street: +${streetMultiplier}`;
      pinMultiplierLi.innerText = `Pin(error must be < 50m): +${pinMultiplier}`;
    } else {
      scoreSpan.innerText = `only ${theGame.rounds[theGame.rounds.length-1].roundScore}`;
      multipliersSpan.innerText = `NONE!

        Distance error too big!

        ${error.toFixed(1)} meters.`;
    }

    //SHOW ROUND SUMMARY AND HIDE MAP
    roundScoreDiv.style.visibility = "visible";
    roundScoreDiv.style.transition = "3s ease";
    roundScoreDiv.style.opacity = "1";

    if(theGame.rounds.length === 5){
      nextRound.innerText = `Summary`;
    }

    mapDiv.style.transition = "0.5s ease";
    mapDiv.style.left = "-700px";
    guessButton.style.transition = "1s ease";
    guessButton.style.left = "-700px";
  });


  //MAP OPACITY CHANGERS
  mapDiv.addEventListener('mouseenter', function(){
    this.style.opacity = "1";
  })
  streetViewDiv.addEventListener('click', function(){
    mapDiv.style.opacity = "0.4";
  })


  //NEXT ROUND BUTTON
  nextRound.addEventListener('click', function(){
    shotsDiv.classList.remove('invisible');
    shotsDiv.innerText = "Shots left: 10";
    messageDiv.innerText = "Guess the country first";
    formStreet.classList.add('invisible');
    formCity.classList.add('invisible');
    formCountry.classList.remove('invisible');
    mapDiv.style.transition = "1s ease";
    mapDiv.style.left = "-700px";
    guessButton.style.transition = "1s ease";
    guessButton.style.left = "-700px";
    deleteMarkers();
    map.setCenter(new google.maps.LatLng(0, 0));
    roundScoreDiv.style.transition = "1s ease";
    roundScoreDiv.style.opacity = "0";
    roundScoreDiv.style.visibility = "hidden";
    formStreet.querySelector('input').removeAttribute("disabled");
    formStreet.querySelector('button').removeAttribute("disabled");
    formStreet.querySelector('.skip-button').removeAttribute("disabled");
    formCity.querySelector('button').removeAttribute("disabled");
    formCountry.querySelector('button').removeAttribute("disabled");
    formCountry.querySelector('input').value = "";
    formCity.querySelector('input').value = "";
    formStreet.querySelector('input').value = "";
    actualCountry.innerText = "Country:";
    actualCity.innerText = "City:";
    actualStreet.innerText = "Street:";
    errorHeader.innerText = "";
    gameScore.innerText = `Score: ${theGame.gameScore}`;
    gameRounds.innerText = `Round: ${theGame.rounds.length+1}/5`;

    randomRound = generateRandomNumber(0, roundsDatabase.length-1);

    if(theGame.rounds.length === 5){
      helloScreenLeft.style.transition = "0.8s ease";
      helloScreenLeft.style.width = "50vw";
      helloScreenLeft.style.opacity= "1";
      helloScreenLeft.style.visibility = "visible";
      helloScreenRight.style.transition = "0.8s ease";
      helloScreenRight.style.width = "50vw";
      helloScreenRight.style.opacity= "1";
      helloScreenRight.style.visibility = "visible";
      helloScreenTop.style.transition = "0.8s ease";
      helloScreenTop.style.height = "33%"
      helloScreenTop.style.opacity= "1";
      helloScreenTop.style.visibility = "visible";

      highscoresListBox.classList.add('invisible');
      highscoresListBox.querySelector('h2').innerHTML = `Your score last game: <span class="color-span">${theGame.gameScore}</span> points.`;
      rulesBox.classList.add('invisible');
      summaryBox.classList.remove('invisible');
      summaryBox.style.fontSize = "1.4rem";
      summaryBox.style.textAlign = "center";
      summaryBox.innerHTML =
        `<h1 class="summary">Summary</h1>
          <ul>
            <li>Round 1: ${theGame.rounds[theGame.rounds.length-5].roundScore} points - ${theGame.rounds[theGame.rounds.length-5].address}</li>
            <li>Round 2: ${theGame.rounds[theGame.rounds.length-4].roundScore} points - ${theGame.rounds[theGame.rounds.length-4].address}</li>
            <li>Round 3: ${theGame.rounds[theGame.rounds.length-3].roundScore} points - ${theGame.rounds[theGame.rounds.length-3].address}</li>
            <li>Round 4: ${theGame.rounds[theGame.rounds.length-2].roundScore} points - ${theGame.rounds[theGame.rounds.length-2].address}</li>
            <li>Round 5: ${theGame.rounds[theGame.rounds.length-1].roundScore} points - ${theGame.rounds[theGame.rounds.length-1].address}</li>
          </ul>
          <p>Total score: <span class="color-span">${theGame.gameScore}</span> points.</p>
        `;


      setTimeout(function(){

        highscoresWrapper.style.visibility = "visible";
        highscoresWrapper.style.transition = "1.5s ease";
        highscoresWrapper.style.opacity = "1";
        submitHighscoresForm.removeAttribute("disabled");

        //CANCEL HIGHSCORES FORM
        cancelHighscoresForm.addEventListener('click', function(e){
          e.preventDefault();
          highscoresWrapper.style.visibility = "hidden";
          highscoresWrapper.style.transition = "0.5s ease";
          highscoresWrapper.style.opacity = "0";
          theGame = new TheGame();
          theGame.generateRound(Math.round(Math.random() * roundsDatabase.length-1));
        });

        //SUBMIT HIGHSCORES FORM
        highscoresForm.addEventListener('submit', function(e){
          e.preventDefault();
          let name = highscoresName.value;
          sendHighScore(theGame.gameScore, name);
          theGame = new TheGame();
          theGame.generateRound(Math.round(Math.random() * roundsDatabase.length-1));
          submitHighscoresForm.setAttribute("disabled","true");
          highscoresWrapper.style.visibility = "hidden";
          highscoresWrapper.style.transition = "0.5s ease";
          highscoresWrapper.style.opacity = "0";
        });
      }, 2000);
    } else {
      theGame.generateRound(randomRound);
    }
  })


  //SHOW RULES BUTTON
  rulesButton.addEventListener('click', function(){
    rulesBox.classList.remove('invisible');
    highscoresListBox.classList.add('invisible');
    summaryBox.classList.add('invisible');
  })

  //SHOW HIGHSCORES BUTTON
  highscoresButton.addEventListener('click', function(){
    highscoresListBox.classList.remove('invisible');
    rulesBox.classList.add('invisible');
    summaryBox.classList.add('invisible');
  });

})
