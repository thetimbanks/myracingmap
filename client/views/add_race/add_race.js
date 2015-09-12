Template.add_race.events({
  "submit .search": function (event) {
    var athlinks_id = event.target.athlinks_id.value;
    Meteor.call("search_athlinks", athlinks_id);

    event.target.athlinks_id.value = "";

    return false;
  },
  'submit .add': function(event) {
    var latlon = Meteor.call("geocode", [event.target.city.value, event.target.state.value, event.target.country.value].join(", "), function(error, result) {
      Meteor.call("add_race", event.target.name.value, result.lat, result.lon, null);
    });

    return false;
  }
});
