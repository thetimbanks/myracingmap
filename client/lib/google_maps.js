GoogleMaps.markers = [];
GoogleMaps.lat_lons = [];
GoogleMaps.default_zoom = 4;
GoogleMaps.focus_zoom = 13;

GoogleMaps.add_marker = function(map, race) {
  var lat_lon = new google.maps.LatLng(race.lat, race.lon);
  var marker = new google.maps.Marker({
    position: lat_lon,
    map: map.instance,
    title: race.name,
    race: race
  });

  google.maps.event.addListener(marker, 'click', function() {
    Router.go("view.race", { _id: Meteor.userId(), race_id: marker.race._id});
  });

  this.markers.push(marker);
  this.lat_lons.push(lat_lon);
}

GoogleMaps.calculate_bounds = function(map) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
    bounds.extend(this.lat_lons[i]);
  }
  map.fitBounds(bounds);
}

GoogleMaps.focus_marker = function(map, race) {
  _.each(this.markers, function(marker) {
    if (race._id && marker.race._id !== race._id) {
      marker.setMap(null);
    } else {
      marker.setMap(map.instance);
    }
  });

  if (race._id) {
    var lat_lon = new google.maps.LatLng(race.lat, race.lon);
    map.instance.setZoom(this.focus_zoom);
    map.instance.setCenter(lat_lon);
  } else {
    map.instance.setZoom(this.default_zoom);
    map.instance.setCenter(this.default_center);
  }
}
