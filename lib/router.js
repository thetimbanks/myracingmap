Router.configure({
  layoutTemplate: 'user_layout',
  loadingTemplate: 'loading_layout'
});

Router.map(function () {
  this.route('home', {
    layoutTemplate: 'application_layout',
    path: '/',
    fastRender: true
  });

  this.route('users.dashboard', {
    template: 'race_list',
    path: '/users/:_id/',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: {
      races: function() {
        return Races.find({user_id: Meteor.userId()});
      }
    }
  });

  this.route('add.race', {
    template: 'add_race',
    path: '/users/:_id/race/add',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    }
  });

  this.route('view.race', {
    template: 'view_race',
    path: '/users/:_id/race/:race_id',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: function() {
        return Races.findOne(this.params.race_id);
    }
  });

  this.route('edit.race', {
    template: 'edit_race',
    path: '/users/:_id/race/:race_id/edit',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: function() {
      return Races.findOne(this.params.race_id);
    }
  });

  this.route('embed.map', {
    layoutTemplate: 'embed_layout',
    path: '/users/:_id/embed',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("embed_races", this.params._id);
    },
    data: {
      races: function() {
        return Races.find({user_id: this.params._id});
      }
    }
  });
});
