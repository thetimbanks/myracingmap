Template.embed_race_map.helpers({
  race_map_options: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // We can use the `ready` callback to interact with the map API once the map is ready.
      GoogleMaps.ready('race_map', function(map) {
        var races = Races.find({user_id: Meteor.userId()}).fetch();

        _.each(races, function(race) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(race.lat, race.lon),
            map: map.instance,
            title: race.name,
            race: race
          });
        });
      });

      // Map initialization options
      return {
        center: new google.maps.LatLng(38.991673, -94.633568),
        zoom: 4,
        disableDefaultUI: true
      };
    }
  }
});
