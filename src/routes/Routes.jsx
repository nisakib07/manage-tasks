import { createBrowserRouter } from "react-router-dom";
import Banner from "../Pages/Banner/Banner";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask";

const Routes = createBrowserRouter([
  {
    path: "/banner",
    element: <Banner></Banner>,
  },
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/addTask",
    element: <AddTask></AddTask>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default Routes;
