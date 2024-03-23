const ip = "192.168.1.200";
let lgtv,
  pointerInputSocket,
  fetchingPointerInputSocket = false;

function connect(tvIp) {
  const tvIpAddres = tvIp || ip;
  console.log(tvIpAddres);
  return new Promise((resolve, reject) => {
    console.log(`connecting to ${tvIpAddres}...`);
    lgtv = require("lgtv2")({
      url: `ws://${tvIpAddres}:3000`,
    });

    // err
    lgtv.on("error", function (err) {
      reject(err);
    });

    // success
    lgtv.on("connect", function () {
      console.log("connected");
      resolve(lgtv);
    });
  });
}

const toggleMute = () => {
  lgtv.request("ssap://audio/getStatus", async (err, res) => {
    if (res.mute) {
      lgtv.request("ssap://audio/setMute", { mute: false });
    } else {
      lgtv.request("ssap://audio/setMute", { mute: true });
    }
  });
};

const updateVolume = (value) => {
  if (value > 0) {
    lgtv.request("ssap://audio/volumeUp");
  } else {
    lgtv.request("ssap://audio/volumeDown");
  }
};

const sendKey = (key) => {
  if (fetchingPointerInputSocket) {
    return;
  }
  getPointerInputSocket().then(() =>
    pointerInputSocket.send("button", { name: key })
  );
};

const getVolume = () => {
  return new Promise((resolve, reject) => {
    lgtv.request("ssap://audio/getVolume", (_err, res) => {
      resolve(res.volume);
    });
  });
};

const getLaunchPoints = () => {
  return new Promise((resolve, reject) => {
    lgtv.request(
      "ssap://com.webos.applicationManager/listLaunchPoints",
      (_err, res) => {
        resolve(res.launchPoints);
      }
    );
  });
};

const getInputList = () => {
  return new Promise((resolve, reject) => {
    lgtv.request("ssap://tv/getExternalInputList", (_err, res) => {
      resolve(res.devices);
    });
  });
};

const launchApp = (appId) => {
  lgtv.request(
    "ssap://com.webos.applicationManager/launch",
    {
      id: appId,
    },
    (err, res) => {}
  );
};

const switchInput = (inputId) => {
  lgtv.request(
    "ssap://tv/switchInput",
    {
      inputId,
    },
    (err, res) => {}
  );
};

const getPointerInputSocket = () => {
  return new Promise((resolve) => {
    if (pointerInputSocket) {
      resolve();
      return;
    }
    console.log("getting pointer input socket");
    fetchingPointerInputSocket = true;
    lgtv.getSocket(
      "ssap://com.webos.service.networkinput/getPointerInputSocket",
      function (err, sock) {
        if (!err) {
          pointerInputSocket = sock;
          fetchingPointerInputSocket = false;
          resolve();
        }
      }
    );
  });
};

const scroll = (deltaY) => {
  if (fetchingPointerInputSocket) {
    return;
  }
  getPointerInputSocket().then(() =>
    pointerInputSocket.send("scroll", { dx: 0, dy: deltaY })
  );
};

const movePointer = (x, y) => {
  if (fetchingPointerInputSocket) {
    return;
  }
  getPointerInputSocket().then(() =>
    pointerInputSocket.send("move", { dx: x, dy: y })
  );
};

const click = () => {
  if (fetchingPointerInputSocket) {
    return;
  }
  getPointerInputSocket().then(() => pointerInputSocket.send("click"));
};

const disconnect = () => {
  lgtv.disconnect();
};

module.exports = {
  connect,
  disconnect,
  toggleMute,
  updateVolume,
  sendKey,
  getVolume,
  getLaunchPoints,
  getInputList,
  launchApp,
  switchInput,
  scroll,
  movePointer,
  click,
};
