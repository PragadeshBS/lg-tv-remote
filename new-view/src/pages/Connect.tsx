import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

declare global {
  interface Window {
    electronAPI: any;
  }
}

const Connect = () => {
  const [connectionState, setConnectionState] = useState<string>("disconnected");
  const [ip, setIp] = useState<string>(localStorage.getItem("ip") || "");
  const navigate = useNavigate();

  const connectToTv = async () => {
    setConnectionState("connecting");
    const err = await window.electronAPI.connectToTv(ip);
    if (err) {
      setConnectionState("disconnected");
    }
    localStorage.setItem("ip", ip);
  };

  const turnOnTv = async () => {
    const err = await window.electronAPI.turnOnTv();
    setConnectionState("turning on");
    // connect after a delay of 5s
    setTimeout(() => {
      setConnectionState("connecting");
      connectToTv();
    }, 5000);
    if (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connectToTv();
    window.electronAPI.onConnectionSuccess(() => {
      navigate("/remote");
    });
  }, []);

  if (connectionState === "turning on") return <Loader msg={`Turning on TV...`} />;

  if (connectionState === "connecting") return <Loader msg={`Connecting to TV  ${ip ? ` at ${ip}` : ""}`} />;

  return (
    <div className="my-3 px-5">
      <div>
      <h1 className="text-5xl">Connection Error</h1>
      <p className="my-5 text-gray-800">
        Make sure your TV is on and connected to the same network as this
        device.
      </p>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        TV's local IP
      </label>
      <input
        type="text"
        placeholder="Leave blank for default IP"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 my-5 text-center me-2 mb-2"
        onClick={connectToTv}
      >
        Retry
      </button>
      </div>
      <div className="my-5">
        <p>
          TV turned off? 
        </p>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 my-5 text-center me-2 mb-2"
          onClick={turnOnTv}
        >
          Turn on TV
        </button>
      </div>
    </div>
  );
};
export default Connect;
