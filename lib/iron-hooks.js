var before_hooks = {
  is_logged_in: function(pause) {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      this.redirect('home');
    }
    this.next();
  },
  redirect_if_logged_in: function(pause) {
    if (Meteor.user()) {
      this.redirect('users.dashboard', { _id: Meteor.userId()});
    }
    this.next();
  }
}

Router.before(before_hooks.is_logged_in, {only: ['users.dashboard', 'view.race', 'edit.race', 'add.race']});
Router.before(before_hooks.redirect_if_logged_in, {only: ['home']});
