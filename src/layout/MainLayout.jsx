import { Outlet } from "react-router-dom";
import StickyNavbar from "../pages/shared/Navbar";
import SimpleFooter from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <>
      <header className="h-full shadow-md bg-gradient-to-r from-primary to-secondary ">
        <StickyNavbar></StickyNavbar>
      </header>
      <Outlet></Outlet>
      <SimpleFooter></SimpleFooter>
    </>
  );
};

export default MainLayout;
