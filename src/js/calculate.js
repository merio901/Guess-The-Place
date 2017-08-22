export function calculateDistance(origin1, origin2) {
  let heading = google.maps.geometry.spherical.computeDistanceBetween(origin1, origin2);
  return heading;
}

export function getRoundScore(startScore, error, multiplier){
  console.log("Start score: ", startScore);
  console.log("Error: ", error);
  console.log("Multiplier: ", multiplier);
  let baseScore = startScore - error;
  let resultScore = 0;

  if(baseScore < 0){
    resultScore = 200;
  } else {
    resultScore = (baseScore * multiplier);
    console.log(baseScore);
  }
  console.log("Round score: ", parseInt(resultScore.toFixed(2)));
  return parseInt(resultScore.toFixed(2));
}
