const { launchApp, switchInput } = require("../lg");
const keyControllerHandleKey = require("./keyController");

const handleKey = (key) => {
  keyControllerHandleKey(key);
};

const handleAppLaunch = (launchPoint) => {
  launchApp(launchPoint.id);
};

const handleInputChange = (input) => {
  switchInput(input.id);
};

module.exports = {
  handleKey,
  handleAppLaunch,
  handleInputChange,
};
