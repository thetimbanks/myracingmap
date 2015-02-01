Template.user_race_map.helpers({
  race_map_options: function() {;

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      GoogleMaps.default_center = new google.maps.LatLng(38.991673, -94.633568);

      if (!GoogleMaps.map_loaded) {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('race_map', function(map) {
          if (GoogleMaps.markers && GoogleMaps.markers.length == 0) {
            var races = Races.find({user_id: Meteor.userId()}).fetch();

            _.each(races, function(race) {
              GoogleMaps.add_marker(map, race);
            });
          }

          GoogleMaps.focus_marker(map, Router.current().params.race_id);
        });

        GoogleMaps.map_loaded = true;
      }

      // Map initialization options
      return {
        center: this.default_center,
        zoom: this.default_zoom
      };
    }

  }
});
