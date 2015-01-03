Template.races.helpers({
  races: function() {
    return Races.find({user_id: Meteor.userId()});
  }
});

Template.dashboard_sidebar.events({
  'click .add': function (event, template) {
    template.$(".dashboard-sidebar").addClass("adding");
  },
  'click .cancel': function (event, template) {
    template.$(".dashboard-sidebar").removeClass("adding viewing");
  },
  "submit .search": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.athlinks_id.value;

    // gmaps.clear_all_markers();
    Meteor.call("search_athlinks", text);
    // Session.set('athlete_id', text);

    // Clear form
    event.target.athlinks_id.value = "";

    // Prevent default form submit
    return false;
  },
  'click .races ul a': function(event) {
    Session.set("current_race", $(event.target).data("race"));
  }
});

Template.view_race.helpers({
  race: function() {
    return Races.findOne(Session.get("current_race"));
  }
});

Template.view_race.rendered = function() {
  Deps.autorun(function() {
    var race = Session.get("current_race");
    if (typeof race !== 'undefined') {
      $(".dashboard-sidebar").removeClass("adding").addClass("viewing");
    }
  });
}
