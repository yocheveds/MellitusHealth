// NOTE object below must be a valid JSON
window.MellitusBLE = $.extend(true, window.MellitusBLE, {
  "config": {
    "layoutSet": "empty",
    "navigation": [
      {
        "title": "Home",
        "onExecute": "#home",
        "icon": "home"
      },
      {
        "title": "About",
        "onExecute": "#about",
        "icon": "info"
      },
      {
        "title": "ble",
        "onExecute": "#ble",
        "icon": "ble"
      },
      {
        "title": "data",
        "onExecute": "#data",
        "icon": "data"
      },
      {
        "title": "graph",
        "onExecute": "#graph",
        "icon": "graph"
      }
    ]
  }
});