import { useState, useEffect } from "react";
import Inputs from "../components/home/Inputs";
import LaunchPoints from "../components/home/LaunchPoints";
import handleKeyDown from "../shared/remoteCalls/handleKeyDown";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import LaunchPoint from "../shared/interfaces/LaunchPoint";
import Input from "../shared/interfaces/Input";
import Loader from "../components/Loader";

const Remote = () => {
  const [data, setData] = useState<{
    launchPoints: LaunchPoint[];
    inputs: Input[];
    foregroundAppId: string;
    audioStatus: {
      volume: number;
      mute: boolean;
    };
  }>({
    launchPoints: [],
    inputs: [],
    foregroundAppId: "",
    audioStatus: {
      volume: 0,
      mute: false,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    window.electronAPI.onGetLaunchPoints((launchPoints: LaunchPoint[]) => {
      setData((prev) => ({ ...prev, launchPoints }));
    });

    window.electronAPI.onGetInputList((inputList: Input[]) => {
      setData((prev) => ({ ...prev, inputs: inputList }));
    });

    window.electronAPI.onGetForegroundAppId((foregroundAppId: string) => {
      setData((prev) => ({ ...prev, foregroundAppId }));
    });

    window.electronAPI.onGetAudioStatus(
      (audioStatus: { volume: number; mute: boolean }) => {
        setData((prev) => ({
          ...prev,
          audioStatus: {
            volume: audioStatus.volume,
            mute: audioStatus.mute,
          },
        }));
      }
    );

    const fetchData = async () => {
      await window.electronAPI.handleAction({
        type: "fetchData",
      });
    };

    fetchData();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (data.inputs.length > 0 && data.launchPoints.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const handlePowerOff = async () => {
    confirm("Are you sure you want to power off the TV?") &&
      (await window.electronAPI.handleAction({
        type: "powerOff",
      }));
  };

  if (loading) return <Loader msg="Fetching Apps and Inputs..." />;

  return (
    <div className="px-5">
      <div className="my-5 flex justify-between px-10">
        <div
          className="text-2xl cursor-pointer text-pink-700"
          onClick={handlePowerOff}
        >
          <FaPowerOff />
        </div>
        <div className="text-center">
          <div className="text-gray-700 text-xl">
            Volume: <span>{data.audioStatus.volume}</span>
          </div>
          <div className="text-gray-700 text-xl">
            Mute: <span>{data.audioStatus.mute ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="text-2xl cursor-pointer text-pink-700">
          <Link to="/pointer">
            <LuMousePointerClick />
          </Link>
        </div>
      </div>
      <LaunchPoints
        launchPoints={data.launchPoints}
        activeAppId={data.foregroundAppId}
      />
      <Inputs inputs={data.inputs} />
    </div>
  );
};
export default Remote;
