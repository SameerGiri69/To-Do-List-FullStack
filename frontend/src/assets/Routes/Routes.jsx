import { createBrowserRouter } from "react-router";
import App from "../../App";
import LoginPage from "../Pages/LoginPage";
import TaskList from "../Components/TaskList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LoginPage /> },
      { path: "tasklist", element: <TaskList /> },
    ],
  },
]);
