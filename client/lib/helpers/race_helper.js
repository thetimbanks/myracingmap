race_helper = {
  get_current_view_race: function() {
    return Session.get("current_view_race");
  },
  set_current_view_race: function(id) {
    Session.set("current_view_race", id);
  },
  get_current_edit_race: function() {
    return Session.get("current_edit_race");
  },
  set_current_edit_race: function(id) {
    Session.set("current_edit_race", id);
  },
  clear_session_races: function() {
    this.set_current_edit_race(null);
    this.set_current_view_race(null);
  },
  show_view_race: function(id) {
    if (typeof id !== 'undefined' && id !== null) {
      this.set_current_edit_race(null);
      $(".dashboard-sidebar").removeClass("adding editing").addClass("viewing");
    }
  },
  show_edit_race: function(id) {
    if (typeof id !== 'undefined' && id !== null) {
      this.set_current_view_race(null);
      $(".dashboard-sidebar").removeClass("adding viewing").addClass("editing");
    }
  },
  show_add_race: function(id) {
    this.clear_session_races();

    $(".dashboard-sidebar").removeClass("viewing editing").addClass("adding");
  },
  show_race_list: function() {
    this.clear_session_races();

    $(".dashboard-sidebar").removeClass("adding viewing editing");
  }
}
