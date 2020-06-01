var electron = require('electron');
var currentWindow = electron.remote.getCurrentWindow();

console.log(currentWindow.custom);
