Meteor.methods({
  search_athlinks: function(athlete_id) {
    console.log("Searching athlinks for athlete results...");
    Athlinks.get_athlete_races(athlete_id);
  },
  geocode: function(location) {
    var result = geo.get_latlon(location);

    console.log("Geocoding location", result);
    return result;
  }
});
