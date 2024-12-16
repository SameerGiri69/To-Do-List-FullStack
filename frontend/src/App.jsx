import { Outlet } from "react-router";
import { UserContext, UserProvider } from "./assets/Context/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavBar from "./assets/Components/NavBar/NavBar";

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
