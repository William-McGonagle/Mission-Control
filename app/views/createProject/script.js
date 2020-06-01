var remote = require('electron').remote;
var currentWindow = remote.getCurrentWindow();

window.onload = function () {

  function createBrowserWindow(url) {
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      frame: false
    });

    win.loadFile(url);
  }

  // Back
  document.getElementById("back").onclick = function () {

    createBrowserWindow("app/views/main/index.html");
    currentWindow.close();

  }

  // Create Project
  document.getElementById("create").onclick = function () {

    alert('create pressed');

  }

}
