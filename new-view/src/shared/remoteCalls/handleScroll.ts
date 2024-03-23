const handleScroll = async (e: WheelEvent) => {
  const deltaY = e.deltaY;
  const action = {
    type: "scroll",
    payload: { deltaY: -deltaY },
  };
  await window.electronAPI.handleAction(action);
};

export default handleScroll;
