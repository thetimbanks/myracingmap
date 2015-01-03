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
          var geo = new GeoCoder({
            httpAdapter: "https",
            apiKey: "AIzaSyAyCZfyTooBJsORNn3NvzNshoYA2dDQllE"
          });

          for(var i = 0; i < result.data.List.length; i++) {
            var geo_result = geo.geocode(result.data.List[i].Race.Home),
            lat = 0,
            lon = 0;

            if (geo_result.length) {
              lat = geo_result[0].latitude,
              lon = geo_result[0].longitude
            }

            Meteor.call("add_race", result.data.List[i].Race.RaceName, lat, lon, athlete_id);
          }
        }
      });
  }
}
