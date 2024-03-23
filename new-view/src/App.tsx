import { createHashRouter, RouterProvider } from "react-router-dom";
import Connect from "./pages/Connect";
import Remote from "./pages/Remote";

const App = () => {
  const router = createHashRouter([
    {
      path: "/remote",
      element: <Remote />,
    },
    { path: "/connect", element: <Connect /> },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
