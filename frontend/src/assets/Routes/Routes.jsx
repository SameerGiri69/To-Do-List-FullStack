import { createBrowserRouter } from "react-router";
import App from "../../App";
import LoginPage from "../Pages/LoginPage";
import TaskList from "../Components/TaskList/TaskList";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateTaskPage from "../Pages/CreateTaskPage/CreateTaskPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import HomePage from "../Pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "/", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "tasks",
        element: (
          <ProtectedRoutes>
            <TaskList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-task",
        element: (
          <ProtectedRoutes>
            <CreateTaskPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
