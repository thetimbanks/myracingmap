Router.configure({
  layoutTemplate: 'application_layout',
  loadingTemplate: 'loading_layout'
});

Router.map(function () {
  this.route('home', {
    path: '/',
    fastRender: true
  });

  this.route('users.dashboard', {
    path: '/users/:_id/',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: {
      races: function() {
        return Races.find({user_id: Meteor.userId()});
      }
    },
    yieldRegions: {
      'race_list': {to: 'sidebar'}
    }
  });

  this.route('add.race', {
    template: 'UsersDashboard',
    path: '/users/:_id/race/add',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    yieldRegions: {
      'add_race': {to: 'sidebar'}
    }
  });

  this.route('view.race', {
    template: 'UsersDashboard',
    path: '/users/:_id/race/:race_id',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: function() {
        return Races.findOne(this.params.race_id);
    },
    yieldRegions: {
      'view_race': {to: 'sidebar'}
    }
  });

  this.route('edit.race', {
    template: 'UsersDashboard',
    path: '/users/:_id/race/:race_id/edit',
    fastRender: true,
    waitOn: function() {
      return Meteor.subscribe("races");
    },
    data: function() {
      return Races.findOne(this.params.race_id);
    },
    yieldRegions: {
      'edit_race': {to: 'sidebar'}
    }
  });
});
