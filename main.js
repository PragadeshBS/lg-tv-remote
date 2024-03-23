const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const {
  connect,
  getLaunchPoints,
  getInputList,
  powerOff,
  sendKeyboardKey,
} = require("./lg.js");
const {
  handleKey,
  handleAppLaunch,
  handleInputChange,
  handleScroll,
  handleMouse,
  handleClick,
} = require("./controllers/controller.js");

let win,
  lgTv,
  foregroundApp,
  audioStatus = {
    volume: 0,
    mute: false,
  },
  subscribedToEvents = false;

const createWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1200,
    height: 800,
  });

  // win.loadURL("http://localhost:5173");
  win.loadFile("./new-view/dist/index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  const subscribeToEvents = () => {
    if (subscribedToEvents) return;
    subscribedToEvents = true;
    lgTv.subscribe(
      "ssap://com.webos.applicationManager/getForegroundAppInfo",
      (_err, res) => {
        foregroundApp = res;
        win.webContents.send("get-foreground-app-id", res.appId);
      }
    );
    lgTv.subscribe("ssap://audio/getStatus", (_err, res) => {
      audioStatus = res;
      win.webContents.send("get-audio-status", res);
    });
  };

  const sendInfo = async () => {
    const launchPoints = await getLaunchPoints();
    const inputList = await getInputList();
    win.webContents.send("get-launch-points", launchPoints);
    win.webContents.send("get-input-list", inputList);
    win.webContents.send("get-foreground-app-id", foregroundApp?.appId);
    win.webContents.send("get-audio-status", audioStatus);
    setTimeout(subscribeToEvents, 100);
  };

  ipcMain.handle("connectToTv", async (_event, ip) => {
    try {
      lgTv = await connect(ip);
      // win.loadURL("http://localhost:5173/#/remote");
      win.webContents.send("connection-success", true);
    } catch (error) {
      return error;
    }
  });

  ipcMain.on("handleAction", (_event, action) => {
    if (action.type == "key") {
      handleKey(action.payload.key);
    } else if (action.type == "scroll") {
      handleScroll(action.payload.deltaY);
    } else if (action.type == "move") {
      handleMouse(action.payload.x, action.payload.y);
    } else if (action.type == "click") {
      handleClick();
    } else if (action.type == "launchPoint") {
      handleAppLaunch(action.payload.launchPoint);
    } else if (action.type == "input") {
      handleInputChange(action.payload.input);
    } else if (action.type == "fetchData") {
      sendInfo();
    } else if (action.type == "powerOff") {
      powerOff();
    } else if (action.type == "keyboard-key") {
      sendKeyboardKey(action.payload.key);
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
  if (lgTv) lgTv.disconnect();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
