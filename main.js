const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const {
  connect,
  getVolume,
  getLaunchPoints,
  getInputList,
} = require("./lg.js");
const {
  handleKey,
  handleAppLaunch,
  handleInputChange,
} = require("./controllers/controller.js");

let win, lgtv;
const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1200,
    height: 800,
  });

  // win.loadFile("index.html");
  win.loadFile("./views/index.html");
};

app.whenReady().then(() => {
  // ipcMain.on("say-hello", (event, msg) => {
  //   console.log("hello your msg was", msg);
  //   win.loadURL("http://localhost:5173");
  // win.loadFile("remote.html");
  // main();
  // });

  ipcMain.handle("connectToTv", async () => {
    try {
      lgtv = await connect();
      win.loadFile("./views/remote.html");
      // win.webContents.openDevTools();
      // setTimeout(() => {
      //   lgtv.subscribe(
      //     "ssap://com.webos.applicationManager/getForegroundAppInfo",
      //     (err, res) => {
      //       console.log(res);
      //       win.webContents.send("get-volume", 66);
      //       console.log("sent");
      //     }
      //   );
      // }, 2000);
      const volume = await getVolume();
      const launchPoints = await getLaunchPoints();
      const inputList = await getInputList();
      setTimeout(() => {
        win.webContents.send("get-volume", volume);
        win.webContents.send("get-launch-points", launchPoints);
        win.webContents.send("get-input-list", inputList);
      }, 100);
    } catch (error) {
      return error;
    }
  });

  ipcMain.on("handleAction", (_event, action) => {
    if (action.type == "key") {
      handleKey(action.payload.key);
    } else if (action.type == "launchPoint") {
      handleAppLaunch(action.payload.launchPoint);
    } else if (action.type == "input") {
      handleInputChange(action.payload.input);
    }
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
