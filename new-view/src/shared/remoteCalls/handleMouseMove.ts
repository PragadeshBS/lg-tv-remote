const handleMouseMove = async (e: MouseEvent) => {
  const x = e.movementX,
    y = e.movementY;
  const action = {
    type: "move",
    payload: { x, y },
  };
  await window.electronAPI.handleAction(action);
};

export default handleMouseMove;
