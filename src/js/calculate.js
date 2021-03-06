export function calculateDistance(origin1, origin2) {
  let heading = google.maps.geometry.spherical.computeDistanceBetween(origin1, origin2);
  return heading;
}

export function getRoundScore(startScore, error, multiplier){
  let baseScore = startScore - error;
  let resultScore = 0;

  if(baseScore < 0){
    resultScore = 200;
  } else {
    resultScore = (baseScore * multiplier);
  }
  return parseInt(resultScore.toFixed(2));
}

export function generateRandomNumber(begin, end){
  let result = Math.abs(Math.round(Math.random() * end - begin));
  return result;
}
