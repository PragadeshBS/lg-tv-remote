const handleClick = async () => {
  const action = {
    type: "click",
  };
  await window.electronAPI.handleAction(action);
};

export default handleClick;
