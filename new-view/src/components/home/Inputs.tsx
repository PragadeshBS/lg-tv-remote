import { useState, useEffect } from "react";
import { shortenText } from "../../shared/utils";
import Input from "../../shared/interfaces/Input";

declare global {
  interface Window {
    electronAPI: any;
  }
}

const Inputs = () => {
  const [inputs, setInputs] = useState<Input[]>([]);

  const handleInputClick = async (input: Input) => {
    await window.electronAPI.handleAction({
      type: "input",
      payload: { input },
    });
  };

  useEffect(() => {
    window.electronAPI.onGetInputList((inputList: Input[]) => {
      setInputs(inputList);
    });
  }, []);

  return (
    <div className="my-3">
      <h1 className="text-3xl my-3">Inputs</h1>
      <div className="flex flex-wrap gap-10 items-center">
        {inputs.map((launchPoint) => (
          <div
            key={launchPoint.label}
            className="flex flex-col w-48 h-36 items-center justify-center cursor-pointer m-1 p-5 rounded-2xl gap-2 app-box"
            onClick={() => handleInputClick(launchPoint)}
          >
            <img
              src={launchPoint.icon}
              alt={launchPoint.label}
              className="w-16"
            />
            <div>{shortenText(launchPoint.label, 19)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Inputs;
