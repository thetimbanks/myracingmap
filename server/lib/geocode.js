geo = new GeoCoder({
  httpAdapter: "https",
  apiKey: "AIzaSyAyCZfyTooBJsORNn3NvzNshoYA2dDQllE"
});

geo.get_latlon = function(location) {
  var lat = 0,
  lon = 0,
  geo_result = geo.geocode(location);

  if (geo_result.length) {
    lat = geo_result[0].latitude,
    lon = geo_result[0].longitude
  }

  return {
    lat: lat,
    lon: lon
  };
}
