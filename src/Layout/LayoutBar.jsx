import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";

export function LayoutBar() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
