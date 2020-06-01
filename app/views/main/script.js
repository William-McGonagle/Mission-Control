var remote = require('electron').remote;
var currentWindow = remote.getCurrentWindow();

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

window.onload = function () {

  // New Project
  document.getElementById("1").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");
    currentWindow.close();

  }

  // Open Project
  document.getElementById("2").onclick = function () {

    createBrowserWindow("app/views/openProject/index.html");
    currentWindow.close();

  }

  // Analyze Data
  document.getElementById("3").onclick = function () {

    createBrowserWindow("app/views/analyze/index.html");
    currentWindow.close();

  }

  // Simulation
  document.getElementById("4").onclick = function () {

    createBrowserWindow("app/views/simulate/index.html");
    currentWindow.close();

  }

  // Settings
  document.getElementById("5").onclick = function () {

    createBrowserWindow("app/views/settings/index.html");
    currentWindow.close();

  }

  // Quit
  document.getElementById("6").onclick = function () {

    remote.app.quit();

  }

}
