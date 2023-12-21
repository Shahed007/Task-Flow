import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser, google } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login Successful");
        location.state ? navigate(location.state) : navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    google().then(() => {
      toast.success("SignUp Successful");
      location.state ? navigate(location.state) : navigate("/");
    });
  };
  return (
    <section className="h-screen my-5 ">
      <Card
        className="max-w-xl bg-secondary/20  mx-auto  px-4"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Login.
        </Typography>
        <form onSubmit={handleLogin} className="mt-8 mb-2   ">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              type="email"
              name="email"
              size="lg"
              placeholder="Enter Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              name="password"
              size="lg"
              placeholder="Enter password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            New here create account?{" "}
            <Link to="/signIn" className="font-medium text-gray-900">
              SignIn
            </Link>
          </Typography>
        </form>
        <div className="flex flex-col gap-6 justify-center align-center">
          <p className="text-center">Or SignUp with</p>
          <div className="flex justify-center">
            <Button onClick={handleGoogleSignUp} size="lg">
              Google
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Login;
