Template.edit_race.events({
  'submit .edit-race': function(event) {
    var marker_position = GoogleMaps.current_marker.getPosition(),
        lat = marker_position.k,
        lon = marker_position.D,
        update_params = {
          name: event.target.name.value,
          lat: lat,
          lon: lon
        };

    Meteor.call("update_race", event.target.id.value, update_params, function() {

    });

    return false;
  }
});
