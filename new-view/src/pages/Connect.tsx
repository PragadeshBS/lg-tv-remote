import { useState, useEffect } from "react";

declare global {
  interface Window {
    electronAPI: any;
  }
}

const Connect = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [ip, setIp] = useState<string>(localStorage.getItem("ip") || "");

  useEffect(() => {
    const connectToTv = async () => {
      const err = await window.electronAPI.connectToTv(ip);
      if (err) {
        setConnected(false);
      }
    };

    connectToTv();
  }, []);

  return connected ? (
    <>
      <h1>Connection Error</h1>
      <p>
        Make sure your TV is on and connected to the same network as this
        device.
      </p>
      <input
        type="text"
        placeholder="TV IP"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button>Retry</button>
    </>
  ) : (
    <h1>Connecting to {ip || "TV"}...</h1>
  );
};
export default Connect;
