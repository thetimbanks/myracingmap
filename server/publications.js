// Meteor.publish definitions
Meteor.publish("races", function () {
  return Races.find({ user_id: this.userId });
});

Meteor.publish("embed_races", function (user_id) {
  return Races.find({ user_id: user_id });
});
