GoogleMaps.markers = [];
GoogleMaps.lat_lons = [];
GoogleMaps.default_zoom = 4;
GoogleMaps.focus_zoom = 13;
GoogleMaps.current_marker;

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

GoogleMaps.fit_bounds = function(map) {
  if (!Router.current().params.race_id) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, lat_long_length = this.lat_lons.length; i < lat_long_length; i++) {
      bounds.extend(this.lat_lons[i]);
    }
    map.instance.fitBounds(bounds);
  }
}

GoogleMaps.set_current_marker = function(marker) {
  if (marker) {
    marker.setDraggable(Router.current().route.getName() === "edit.race");
  }
  this.current_marker = marker;
}

GoogleMaps.focus_marker = function(map, race_id) {
  this.set_current_marker(null);
  _.each(this.markers, function(marker) {
    if (race_id && marker.race._id !== race_id) {
      marker.setMap(null);
    } else {
      marker.setMap(map.instance);
    }

    if (race_id && marker.race._id === race_id) {
      GoogleMaps.set_current_marker(marker);
    }
  });

  if (race_id) {
    var race = Router.current().data(),
        lat_lon = new google.maps.LatLng(race.lat, race.lon);

    map.instance.setZoom(this.focus_zoom);
    map.instance.setCenter(lat_lon);
  } else {
    map.instance.setZoom(this.default_zoom);
    map.instance.setCenter(this.default_center);
  }
}
