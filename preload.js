const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  connectToTv: (ip) => ipcRenderer.invoke("connectToTv", ip),
  handleAction: (action) => ipcRenderer.send("handleAction", action),
  onGetVolume: (callback) =>
    ipcRenderer.on("get-volume", (_event, value) => callback(value)),
  onGetLaunchPoints: (callback) =>
    ipcRenderer.on("get-launch-points", (_event, value) => callback(value)),
  onGetInputList: (callback) =>
    ipcRenderer.on("get-input-list", (_event, value) => callback(value)),
  onGetForegroundAppId: (callback) =>
    ipcRenderer.on("get-foreground-app-id", (_event, value) => callback(value)),
  onGetAudioStatus: (callback) =>
    ipcRenderer.on("get-audio-status", (_event, value) => callback(value)),
});
