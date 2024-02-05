const keysToHandle = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Meta",
  "Enter",
  "Backspace",
  "Escape",
  "m",
  "M",
  "+",
  "-",
  "h",
  "H",
];

document.addEventListener("DOMContentLoaded", async () => {
  // const volumeSlider = document.getElementById("volume-slider");
  // const volumeValue = document.getElementById("volume-val");
  // window.electronAPI.onGetVolume((value) => {
  //   volumeSlider.value = value;
  //   volumeValue.innerText = value;
  // });

  window.electronAPI.onGetLaunchPoints((launchPoints) => {
    const launchPointsContainer = document.getElementById(
      "launch-points-container"
    );
    launchPointsContainer.innerHTML = "";
    launchPoints.forEach((launchPoint) => {
      const launchPointDiv = document.createElement("div");
      launchPointDiv.className = "launch-point";
      const launchPointImg = document.createElement("img");
      const launchPointTitle = document.createElement("div");
      launchPointTitle.innerText = launchPoint.title;
      launchPointImg.src = launchPoint.icon;
      launchPointDiv.appendChild(launchPointImg);
      launchPointDiv.appendChild(launchPointTitle);
      launchPointDiv.classList.add("launch-point");
      launchPointDiv.addEventListener("click", () => {
        window.electronAPI.handleAction({
          type: "launchPoint",
          payload: { launchPoint },
        });
      });
      launchPointsContainer.appendChild(launchPointDiv);
    });
  });

  window.electronAPI.onGetInputList((inputList) => {
    const inputListContainer = document.getElementById("input-list-container");
    inputListContainer.innerHTML = "";
    inputList.forEach((input) => {
      const inputDiv = document.createElement("div");
      inputDiv.className = "input";
      const inputImg = document.createElement("img");
      const inputTitle = document.createElement("div");
      inputTitle.innerText = input.label + `(${input.id})`;
      inputImg.src = input.icon;
      inputDiv.appendChild(inputImg);
      inputDiv.appendChild(inputTitle);
      inputDiv.addEventListener("click", () => {
        window.electronAPI.handleAction({
          type: "input",
          payload: { input },
        });
      });
      inputListContainer.appendChild(inputDiv);
    });
  });

  document.addEventListener("keydown", async (e) => {
    if (keysToHandle.includes(e.key)) {
      e.preventDefault();
      const key = e.key;
      const action = {
        type: "key",
        payload: { key },
      };
      await window.electronAPI.handleAction(action);
    }
  });
});
