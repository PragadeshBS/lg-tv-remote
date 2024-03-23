import { useState, useEffect } from "react";
import { shortenText } from "../../shared/utils";
import LaunchPoint from "../../shared/interfaces/LaunchPoint";

declare global {
  interface Window {
    electronAPI: any;
  }
}

const LaunchPoints = () => {
  const [launchPoints, setLaunchPoints] = useState<LaunchPoint[]>([]);

  const handleLaunchPointClick = async (launchPoint: LaunchPoint) => {
    await window.electronAPI.handleAction({
      type: "launchPoint",
      payload: { launchPoint },
    });
  };

  useEffect(() => {
    window.electronAPI.onGetLaunchPoints((launchPoints: LaunchPoint[]) => {
      setLaunchPoints(launchPoints);
    });
  }, []);

  return (
    <div className="my-3">
      <h1 className="text-3xl my-3">Apps</h1>
      <div className="flex flex-wrap gap-10 items-center">
        {launchPoints.map((launchPoint) => (
          <div
            key={launchPoint.title}
            className="flex flex-col w-48 h-36 items-center justify-center cursor-pointer m-1 p-5 rounded-2xl gap-2 app-box"
            onClick={() => handleLaunchPointClick(launchPoint)}
          >
            <img
              src={launchPoint.icon}
              alt={launchPoint.title}
              className="w-16"
            />
            <div>{shortenText(launchPoint.title, 19)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LaunchPoints;
