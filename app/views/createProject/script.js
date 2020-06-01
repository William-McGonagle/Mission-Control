var remote = require('electron').remote;
var currentWindow = remote.getCurrentWindow();

window.onload = function () {

  function createBrowserWindow(url, frame) {
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      height: 600,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      frame: frame
    });

    win.loadFile(url);
  }

  // Back
  document.getElementById("back").onclick = function () {

    createBrowserWindow("app/views/main/index.html", false);
    currentWindow.close();

  }

  // Create Project
  document.getElementById("create").onclick = function () {

    var fs = remote.require('fs');

    var projectName = document.getElementById("projectName");
    var projectCreator = document.getElementById("projectCreator");

    if (!fs.existsSync("./projects/" + projectName.value + "/")) fs.mkdirSync("./projects/" + projectName.value + "/");
    fs.writeFileSync("./projects/" + projectName.value + "/manifest.json", JSON.stringify({
      projectName: projectName.value,
      projectCreator: projectCreator.value
    }, null, 4));

    var windowData = createBrowserWindow("app/views/project/index.html", false);
    windowData.custom = {
      'projectId': projectName.value
    };

    currentWindow.close();

  }

}
