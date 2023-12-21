import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../pages/home/shared/Navbar";

const MainLayout = () => {
  return (
    <>
      <header className="h-full shadow-md bg-gradient-to-r from-primary to-secondary">
        <StickyNavbar></StickyNavbar>
      </header>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
