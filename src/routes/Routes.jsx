import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);

export default Routes;
