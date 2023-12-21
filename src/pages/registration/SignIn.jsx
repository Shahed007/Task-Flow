import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function SimpleRegistrationForm() {
  const { createUser, profileUpdate, google } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("password should be 6 character");
      return;
    }

    createUser(email, password)
      .then(() => {
        profileUpdate(name, image).then(() => {
          toast.success("SignUp successful");
          location.state ? navigate(location.state) : navigate("/")
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignUp = ()=> {
    google().then(()=> {
      toast.success('SignUp Successful')
      location.state ? navigate(location.state) : navigate("/")
    })
  }
  return (
    <section className="h-screen my-5">
      <Card
        className="max-w-xl bg-secondary/20  mx-auto xl:p-3 p-4"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSignUp} className="mt-8 mb-2   ">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              required
              type="text"
              name="name"
              size="lg"
              placeholder="Enter your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Photo URL
            </Typography>
            <Input
              required
              type="text"
              name="image"
              size="lg"
              placeholder="Enter url"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              required
              size="lg"
              type="email"
              name="email"
              placeholder="example@mail.com"
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
              size="lg"
              name="password"
              placeholder="Enter your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
        <div className="flex flex-col gap-6 justify-center align-center">
          <p className="text-center">Or SignUp with</p>
          <div className="flex justify-center">
            <Button onClick={handleGoogleSignUp} size="lg">Google</Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
