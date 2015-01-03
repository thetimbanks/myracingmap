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
    template.$(".dashboard-sidebar").removeClass("adding viewing editing");
  },
  "submit .search": function (event) {
    var athlinks_id = event.target.athlinks_id.value;
    Meteor.call("search_athlinks", athlinks_id);

    event.target.athlinks_id.value = "";

    return false;
  },
  'click .races ul a': function(event) {
    Session.set("current_view_race", $(event.target).data("race"));
  },
  'click .edit': function(event) {
    Session.set("current_edit_race", $(event.target).data("race"));
  },
  'submit .edit-race': function(event) {
    var update_params = {
      name: event.target.name.value
    };

    Meteor.call("update_race", Session.get("current_edit_race"), update_params);
    $(".dashboard-sidebar").removeClass("editing").addClass("viewing");

    return false;
  }
});

Template.view_race.helpers({
  race: function() {
    return Races.findOne(Session.get("current_view_race"));
  }
});

Template.view_race.rendered = function() {
  Deps.autorun(function() {
    var race = Session.get("current_view_race");
    if (typeof race !== 'undefined') {
      $(".dashboard-sidebar").removeClass("adding editing").addClass("viewing");
    }
  });
}

Template.edit_race.helpers({
  race: function() {
    return Races.findOne(Session.get("current_edit_race"));
  }
});

Template.edit_race.rendered = function() {
  Deps.autorun(function() {
    var race = Session.get("current_edit_race");
    if (typeof race !== 'undefined') {
      $(".dashboard-sidebar").removeClass("adding viewing").addClass("editing");
    }
  });
}
