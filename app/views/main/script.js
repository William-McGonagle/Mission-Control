const remote = require('electron').remote;

function createBrowserWindow(url) {
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 800,
    frame: false
  });

  win.loadFile(url);
}

window.onload = function () {

  // New Project
  document.getElementById("1").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

  // Open Project
  document.getElementById("2").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

  // Analyze Data
  document.getElementById("3").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

  // Simulation
  document.getElementById("4").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

  // Settings
  document.getElementById("5").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

  // Quit
  document.getElementById("6").onclick = function () {

    createBrowserWindow("app/views/createProject/index.html");

  }

}
