Meteor.methods({
  add_race: function(name, lat, lon, athlete_id) {
    Races.insert({
      user_id: Meteor.userId(),
      name: name,
      lat: lat,
      lon: lon,
      athlete_id: athlete_id,
      createdAt: new Date()
    });
  },
  delete_race: function(id) {
    Races.remove(id);
  },
  update_race: function(id, update_params) {
    Races.update({_id: id}, { $set: update_params });
  },
  search_athlinks: function(athlete_id) {
    console.log("Searching athlinks for athlete results...");
    Athlinks.get_athlete_races(athlete_id);
  }
});
