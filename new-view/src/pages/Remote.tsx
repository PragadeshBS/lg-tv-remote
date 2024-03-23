import { useEffect } from "react";
import Inputs from "../components/home/Inputs";
import LaunchPoints from "../components/home/LaunchPoints";
import handleKeyDown from "../shared/remoteCalls/handleKeyDown";
import handleScroll from "../shared/remoteCalls/handleScroll";
import handleMouseMove from "../shared/remoteCalls/handleMouseMove";
import handleClick from "../shared/remoteCalls/handleClick";

const Remote = () => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("wheel", handleScroll);
    document.addEventListener("click", handleClick);

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
