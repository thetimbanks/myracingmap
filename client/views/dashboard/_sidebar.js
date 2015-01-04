Template.races.helpers({
  races: function() {
    return Races.find({user_id: Meteor.userId()});
  }
});

Template.dashboard_sidebar.events({
  'click .add': function (event, template) {
    race_helper.show_add_race();
  },
  'click .cancel': function (event, template) {
    race_helper.show_race_list();
  },
  "submit .search": function (event) {
    var athlinks_id = event.target.athlinks_id.value;
    Meteor.call("search_athlinks", athlinks_id);

    event.target.athlinks_id.value = "";

    return false;
  },
  'click .races ul a': function(event) {
    race_helper.set_current_view_race($(event.target).data("race"));
  },
  'click .edit': function(event) {
    race_helper.set_current_edit_race($(event.target).data("race"));
  },
  'submit .edit-race': function(event) {
    var update_params = {
      name: event.target.name.value
    };

    Meteor.call("update_race", race_helper.get_current_edit_race(), update_params, function() {
      race_helper.set_current_view_race(race_helper.get_current_edit_race());
    });

    return false;
  },
  'submit .form-add-race': function(event) {
    var latlon = Meteor.call("geocode", [event.target.city.value, event.target.state.value, event.target.country.value].join(", "), function(error, result) {
      Meteor.call("add_race", event.target.name.value, result.lat, result.lon, null);
      race_helper.show_race_list();
    });

    return false;
  }
});

Template.view_race.helpers({
  race: function() {
    return Races.findOne(race_helper.get_current_view_race());
  }
});

Template.view_race.rendered = function() {
  Deps.autorun(function() {
    race_helper.show_view_race(race_helper.get_current_view_race());
  });
}

Template.edit_race.helpers({
  race: function() {
    return Races.findOne(race_helper.get_current_edit_race());
  }
});

Template.edit_race.rendered = function() {
  Deps.autorun(function() {
    race_helper.show_edit_race(race_helper.get_current_edit_race());
  });
}
