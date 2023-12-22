import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function StickyNavbar() {
  const { user, logout } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogOut = () => {
    logout().then(() => {
      toast.success("Logout successful");
      navigate("/");
    });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "px-3 py-2 font-normal flex items-center bg-primary rounded-[4px] shadow-md border-secondary/30"
              : "px-3 py-2 font-normal flex items-center duration-200 hover:bg-primary hover:rounded-[4px] hover:shadow-md hover:border-secondary/30"
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/task-board"
          className={({ isActive }) =>
            isActive
              ? "px-3 py-2 font-normal flex items-center bg-primary rounded-[4px] shadow-md border-secondary/30"
              : "px-3 py-2 font-normal flex items-center duration-200 hover:bg-primary hover:rounded-[4px] hover:shadow-md hover:border-secondary/30"
          }
        >
          Task Board
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/task-dashboard"
          className={({ isActive }) =>
            isActive
              ? "px-3 py-2 font-normal flex items-center bg-primary rounded-[4px] shadow-md border-secondary/30"
              : "px-3 py-2 font-normal flex items-center duration-200 hover:bg-primary hover:rounded-[4px] hover:shadow-md hover:border-secondary/30"
          }
        >
          Task Dashboard
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <Container>
      <Navbar className="sticky top-0 z-10  max-w-full bg-transparent shadow-none  rounded-none  py-4 backdrop-blur-0 border-0 backdrop-saturate-100 ">
        <div className="flex items-center justify-between  h-full text-white">
          <Link to="/" className="text-3xl font-semibold ">
            TaskBoard
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {user ? (
                <div className="sm:flex hidden items-center gap-6">
                  <Button onClick={handleLogOut} className="bg-primary">
                    LogOut
                  </Button>
                </div>
              ) : (
                <Link to="/logIn">
                  <Button
                    size="md"
                    className="hidden lg:inline-block bg-primary active:scale-95"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div>
            {user ? (
              <div className="sm:hidden flex gap-2 items-center">
                <Button onClick={handleLogOut} className="bg-primary">LogOut</Button>
              </div>
            ) : (
              <Link to="/logIn">
                <Button fullWidth variant="gradient" size="md" className="">
                  <span>Log In</span>
                </Button>
              </Link>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </Container>
  );
}
