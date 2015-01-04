Athlinks = {
  base_api_url: "http://api.athlinks.com/",
  api_key: "5a607801f0ba145946a67ab648a449b6",
  default_query_params: function() {
      return "?format=json&key=" + this.api_key;
  },
  get_athlete_races: function(athlete_id) {
    Meteor.http.call("GET", this.base_api_url + "athletes/results/" + athlete_id + this.default_query_params(),
      {},
      function (error, result) {
        if (!error) {
          console.log("Athlete found! Results count: ", result.data.List.length);

          for(var i = 0; i < result.data.List.length; i++) {
            var latlon = geo.get_latlon(result.data.List[i].Race.Home);

            Meteor.call("add_race", result.data.List[i].Race.RaceName, latlon.lat, latlon.lon, athlete_id);
          }
        }
      });
  }
}
