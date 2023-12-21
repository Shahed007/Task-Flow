import heroBanner from "../../assets/banner/hero-banner.webp";
import Container from "../../components/container/Container";
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
        <div className="relative z-30 ">
          <h1 className="text-4xl text-white">
            Master Your Tasks with TaskFlow
          </h1>
          <p>
            TaskMaster Pro: Your ally in productivity. Organize tasks
            effortlessly, collaborate seamlessly, and conquer deadlines. Elevate
            your workflow with our intuitive task management solution. Embrace
            efficiency, celebrate accomplishments. TaskMaster Pro – Where tasks
            meet mastery. 🚀
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
