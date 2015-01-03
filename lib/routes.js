Router.configure({
  layoutTemplate: 'application_layout'
});

Router.map(function () {
  this.route('home', {
    path: '/',
    fastRender: true
  });

  this.route('users.dashboard', {
    path: '/users/:_id/',
    fastRender: true
  });
});
