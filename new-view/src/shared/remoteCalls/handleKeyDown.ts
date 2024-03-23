import keysToHandle from "../keysToHandle";

const handleKeyDown = async (e: KeyboardEvent, considerCtrl = false) => {
  if (
    considerCtrl &&
    (e.key.length == 1 || e.key == "Backspace" || e.key == "Enter")
  ) {
    if (e.ctrlKey) {
      e.preventDefault();
      const key = e.key;
      const action = {
        type: "key",
        payload: { key },
      };
      await window.electronAPI.handleAction(action);
    } else {
      await window.electronAPI.handleAction({
        type: "keyboard-key",
        payload: { key: e.key },
      });
    }
    return;
  }
  if (keysToHandle.includes(e.key)) {
    e.preventDefault();
    const key = e.key;
    const action = {
      type: "key",
      payload: { key },
    };
    await window.electronAPI.handleAction(action);
  }
};

export default handleKeyDown;
