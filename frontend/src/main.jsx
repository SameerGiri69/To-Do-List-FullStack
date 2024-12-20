import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./assets/Routes/Routes";
import { UserContext, UserProvider } from "./assets/Context/useAuth";
createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
    }}
  />
);
