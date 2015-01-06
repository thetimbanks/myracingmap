Template.edit_race.events({
  'submit .edit-race': function(event) {
    var update_params = {
      name: event.target.name.value
    };

    Meteor.call("update_race", event.target.id.value, update_params, function() {

    });

    return false;
  }
});
