import { useEffect } from "react";
import Inputs from "../components/home/Inputs";
import LaunchPoints from "../components/home/LaunchPoints";
import keysToHandle from "../shared/keysToHandle";

const Remote = () => {
  useEffect(() => {
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="px-5">
      <LaunchPoints />
      <Inputs />
    </div>
  );
};
export default Remote;
