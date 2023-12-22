import { Link } from "react-router-dom";
import heroBanner from "../../assets/banner/hero-banner.webp";
import Container from "../../components/container/Container";
import { Button } from "@material-tailwind/react";
const Hero = () => {
  return (
    <section
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${heroBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100dvh",
        position: "relative",
      }}
    >
      <div className="absolute z-10 bg-gradient-to-bl from-primary/70 to-secondary/70 top-0 left-0 w-full h-full"></div>
      <Container>
        <div className="relative z-30 flex flex-col gap-5 lg:items-start items-center">
          <h1 className="lg:text-4xl text-3xl text-white font-bold">
            Master Your Tasks with TaskFlow
          </h1>
          <p className="text-white lg:w-6/12 w-full">
            TaskMaster Pro: Your ally in productivity. Organize tasks
            effortlessly, collaborate seamlessly, and conquer deadlines. Elevate
            your workflow with our intuitive task management solution. Embrace
            efficiency, celebrate accomplishments. TaskMaster Pro – Where tasks
            meet mastery. 🚀
          </p>
          <Link to="/task-dashboard">
            <Button className="bg-primary" size="xl">
              Let’s Explore
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
