const { toggleMute, updateVolume, sendKey } = require("../lg");

const handleNavigationKeys = (key) => {
  const keyMap = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
    Enter: "ENTER",
    Backspace: "BACK",
    Escape: "EXIT",
    Meta: "HOME",
    h: "HOME",
    H: "HOME",
  };
  key = keyMap[key];
  sendKey(key);
};

const handleVolumeKeys = (key) => {
  const keyMap = {
    "+": "VOLUMEUP",
    "-": "VOLUMEDOWN",
    m: "MUTE",
    M: "MUTE",
  };
  key = keyMap[key];
  if (key == "MUTE") {
    toggleMute();
    return;
  }
  if (key == "VOLUMEUP") {
    updateVolume(1);
    return;
  }
  updateVolume(-1);
};

const handleKey = (key) => {
  console.log("handling key", key);
  const navigationKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Enter",
    "Backspace",
    "Escape",
    "Meta",
    "h",
    "H",
  ];
  const volumeKeys = ["+", "-", "m", "M"];
  if (navigationKeys.includes(key)) {
    handleNavigationKeys(key);
    return;
  }
  if (volumeKeys.includes(key)) {
    handleVolumeKeys(key);
  }
  // lgtv.request(
  //   "ssap://com.webos.applicationManager/listLaunchPoints",
  //   async (err, res) => {
  //     console.log(res);
  //   }
  // );
};

module.exports = handleKey;
