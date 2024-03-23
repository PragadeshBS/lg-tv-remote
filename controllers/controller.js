const { launchApp, switchInput, scroll, movePointer, click } = require("../lg");
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

const handleScroll = (deltaY) => {
  scroll(deltaY);
};

const handleMouse = (x, y) => {
  movePointer(x, y);
};

const handleClick = () => {
  click();
};

module.exports = {
  handleKey,
  handleScroll,
  handleMouse,
  handleClick,
  handleAppLaunch,
  handleInputChange,
};
