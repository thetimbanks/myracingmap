// Meteor.publish definitions
Meteor.publish("races", function () {
  return Races.find({ user_id: this.userId });
});
