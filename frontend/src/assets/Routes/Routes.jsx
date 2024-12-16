import { createBrowserRouter } from "react-router";
import App from "../../App";
import LoginPage from "../Pages/LoginPage";
import TaskList from "../Components/TaskList/TaskList";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateTaskPage from "../Pages/CreateTaskPage/CreateTaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
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
