export function calculateDistance(origin1, origin2) {
  var heading = google.maps.geometry.spherical.computeDistanceBetween(origin1, origin2);
  console.log(parseInt(heading));
  return heading;
}
