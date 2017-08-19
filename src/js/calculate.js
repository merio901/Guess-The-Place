export function calculateDistance(origin1, origin2) {
  let heading = google.maps.geometry.spherical.computeDistanceBetween(origin1, origin2);
  console.log(parseInt(heading));
  return heading;
}


export function getRoundScore(startScore, error, multiplier){
  console.log("Start score: ", startScore);
  console.log("Error: ", error);
  console.log("Multiplier: ", multiplier);
  let baseScore = startScore - error;
  let resultScore = 0;
  if(baseScore < 0){
    resultScore = 0;
  } else {
    resultScore = ((baseScore) * (1 + multiplier));
  }
  return parseInt(resultScore.toFixed(2));
}
