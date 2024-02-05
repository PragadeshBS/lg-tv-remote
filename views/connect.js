async function connectToTv() {
  const connectingDiv = document.querySelector("#connect-msg");
  const errDiv = document.querySelector("#connect-err");

  connectingDiv.style.display = "block";
  errDiv.style.display = "none";
  const err = await window.electronAPI.connectToTv();
  if (err) {
    connectingDiv.style.display = "none";
    errDiv.style.display = "block";
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  connectToTv();
  const retryBtn = document.querySelector("#retry-btn");
  retryBtn.addEventListener("click", connectToTv);
});
