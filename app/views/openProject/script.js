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

  function project(text, id) {

    var div = document.createElement("div");
    div.className = "project";
    div.innerHTML = "<p>" + text + "</p>";
    div.onclick = function () {

      createBrowserWindow("app/views/project/index.html");
      currentWindow.close();

    }

    var projects = document.getElementById("projects");
    projects.append(div);

  }

  document.getElementById("back").onclick = function () {

    createBrowserWindow("app/views/main/index.html");
    currentWindow.close();

  };

  project("Project", 5);

}
