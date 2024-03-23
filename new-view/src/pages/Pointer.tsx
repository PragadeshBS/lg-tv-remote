import { useEffect } from "react";
import handleKeyDown from "../shared/remoteCalls/handleKeyDown";
import handleScroll from "../shared/remoteCalls/handleScroll";
import handleMouseMove from "../shared/remoteCalls/handleMouseMove";
import handleClick from "../shared/remoteCalls/handleClick";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import keyDescription from "../shared/keyDescription";

const Pointer = () => {
  const handleKeyDownEvent = (e: KeyboardEvent) => {
    handleKeyDown(e, true);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEvent);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("wheel", handleScroll);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="px-5">
      <div className="my-3 flex justify-end gap-10">
        <div className="text-2xl cursor-pointer text-pink-700">
          <Link to="/remote">
            <MdHome />
          </Link>
        </div>
      </div>
      <div className="text-center my-10">
        <div className="text-lg text-gray-500">
          <div>Control your TV's pointer with your mouse.</div>
          <div className="my-3">Use your keyboard to type on your TV</div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl mb-3">Keyboard controls</h1>
        <table className="mx-auto">
          <tbody>
            {Object.keys(keyDescription).map((key) => (
              <tr key={key}>
                <td className="text-lg px-20 py-1">{key}</td>
                <td className="text-lg text-gray-500 px-20">
                  {keyDescription[key as keyof typeof keyDescription]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-sm text-gray-700">
          *Ctrl key is required only on this page. Use only the key mentioned in
          the home page.
        </div>
      </div>
    </div>
  );
};
export default Pointer;
