import { createHashRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect";
import Remote from "./pages/Remote";
import Pointer from "./pages/Pointer";

const App = () => {
  const router = createHashRouter([
    {
      path: "/remote",
      element: <Remote />,
    },
    { path: "/", element: <Connect /> },
    {
      path: "/pointer",
      element: <Pointer />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
