import { createBrowserRouter } from "react-router-dom";
import Banner from "../Pages/Banner/Banner";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask";
import MainLayout from "../Pages/MainLayout/MainLayout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const Routes = createBrowserRouter([
  {
    path: "/banner",
    element: <Banner></Banner>,
  },
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Routes;
