import { shortenText } from "../../shared/utils";
import Input from "../../shared/interfaces/Input";

declare global {
  interface Window {
    electronAPI: any;
  }
}

const Inputs = ({ inputs }: { inputs: Input[] }) => {
  const handleInputClick = async (input: Input) => {
    await window.electronAPI.handleAction({
      type: "input",
      payload: { input },
    });
  };

  return (
    <div className="my-3">
      <h1 className="text-3xl my-3">Inputs</h1>
      <div className="flex flex-wrap gap-10 items-center">
        {inputs.map((input: Input) => (
          <div
            key={input.label}
            className="flex flex-col w-48 h-36 items-center justify-center cursor-pointer m-1 p-5 rounded-2xl gap-2 app-box"
            onClick={() => handleInputClick(input)}
          >
            <img src={input.icon} alt={input.label} className="w-16" />
            <div>{shortenText(input.label, 19)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Inputs;
