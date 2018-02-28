var toggleSidebar;

toggleSidebar = function() {};

window.addLoadListener(function() {
  var body, showSidebar;
  body = document.querySelector('body');
  showSidebar = false;
  return toggleSidebar = function() {
    if (showSidebar) {
      showSidebar = false;
      return body.classList.remove('show-sidebar');
    } else {
      showSidebar = true;
      return body.classList.add('show-sidebar');
    }
  };
});
