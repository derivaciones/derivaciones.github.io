window.addLoadListener = function(func) {
  var oldonload;
  oldonload = window.onload;
  if (typeof oldonload !== 'function') {
    return window.onload = func;
  } else {
    return window.onload = function() {
      oldonload();
      return func();
    };
  }
};
