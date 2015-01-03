Router.configure({
  layoutTemplate: 'application_layout'
});

Router.map(function () {
  this.route('home', {
    path: '/',

    onBeforeAction: function (pause) {
      if (Meteor.userId()) {
        this.redirect('users.dashboard', { _id: Meteor.userId()});
      } else {
        this.render('home');
      }
    }
  });

  this.route('users.dashboard', {
    path: '/users/:_id/',

    onBeforeAction: function() {
      if (!Meteor.userId()) {
        this.redirect('home');
      } else {
        this.render('dashboard');
      }
    }
  });
});
