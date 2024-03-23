import keysToHandle from "../keysToHandle";

const handleKeyDown = async (e: KeyboardEvent) => {
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
