import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import Container from "../../components/container/Container";
import { useState } from "react";

const About = () => {
  const [alwaysOpen, setAlwaysOpen] = useState(true);
  const handleOpen = () => setAlwaysOpen(!alwaysOpen);
  return (
    <section className="my-20">
      <h1 className="font-bold text-3xl text-center mb-12">
        Whom this can be of benefit?
      </h1>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Individual Users:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Personal Organization:</span>{" "}
                    Users can keep track of their personal tasks, set
                    priorities, and manage deadlines.
                  </li>
                  <li>
                    <span className="font-bold">Time Management:</span> The tool
                    can help individuals allocate time effectively, set
                    reminders, and avoid missing important deadlines.
                  </li>
                  <li>
                    <span className="font-bold">Goal Achievement:</span> Users
                    can break down larger goals into manageable tasks, making it
                    easier to achieve long-term objectives.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Teams and Small Businesses:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Collaboration:</span> Teams can
                    use the platform to collaborate on projects, assign tasks,
                    and track progress collectively.
                  </li>
                  <li>
                    <span className="font-bold">Communication:</span> The tool
                    Task comments, file attachments, and status updates
                    facilitate communication and ensure everyone is on the same
                    page.
                  </li>
                  <li>
                    <span className="font-bold">Efficiency:</span> Centralizing
                    tasks in one platform reduces the need for numerous
                    communication channels and minimizes the risk of tasks being
                    overlooked.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Project Managers:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Project Planning:</span> Project
                    managers can plan and organize tasks, allocate resources,
                    and set milestones.
                  </li>
                  <li>
                    <span className="font-bold">Progress Tracking:</span> The
                    platform allows managers to monitor the progress of tasks,
                    identify bottlenecks, and make informed decisions to keep
                    projects on track.
                  </li>
                  <li>
                    <span className="font-bold">Progress Tracking:</span>
                    Resource Allocation: Efficiently allocate resources based on
                    the workload of team members and task priorities.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
          </div>
          <div>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Freelancers and Contractors:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Task Visibility:</span>
                    Freelancers can have a clear view of their upcoming tasks,
                    deadlines, and project requirements.
                  </li>
                  <li>
                    <span className="font-bold">Client Collaboration: </span>{" "}
                    Collaborate with clients by sharing tasks, updates, and
                    project-related information, fostering transparency and
                    trust.
                  </li>
                  <li>
                    <span className="font-bold">Portfolio Management:</span>{" "}
                    Keep track of completed tasks and build a portfolio for
                    showcasing expertise and accomplishments.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Teams and Small Businesses:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Students:</span> Teams can use
                    the platform to collaborate on projects, assign tasks, and
                    track progress collectively.
                  </li>
                  <li>
                    <span className="font-bold">Assignment Management: </span>
                    Students can use the platform to manage assignments,
                    projects, and deadlines. page.
                  </li>
                  <li>
                    <span className="font-bold">Study Planning:</span> Break
                    down study sessions into tasks, set study goals, and track
                    progress over time.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
            <Accordion open={alwaysOpen}>
              <AccordionHeader onClick={handleOpen}>
                Remote Workers:
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  <li>
                    <span className="font-bold">Remote Collaboration: </span> As
                    more people work remotely, a task management tool
                    facilitates collaboration and ensures remote teams stay
                    organized and connected.
                  </li>
                  <li>
                    <span className="font-bold">Flexible Scheduling:</span>{" "}
                    Helps remote workers manage their schedules, prioritize
                    tasks, and maintain work-life balance.
                  </li>
                </ul>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;

/* 
Freelancers and Contractors:

Task Visibility: Freelancers can have a clear view of their upcoming tasks, deadlines, and project requirements.
Client Collaboration: Collaborate with clients by sharing tasks, updates, and project-related information, fostering transparency and trust.
Portfolio Management: Keep track of completed tasks and build a portfolio for showcasing expertise and accomplishments.
Students:

Assignment Management: Students can use the platform to manage assignments, projects, and deadlines.
Study Planning: Break down study sessions into tasks, set study goals, and track progress over time.
Group Projects: Collaborate with classmates on group projects, assign tasks, and coordinate efforts effectively.
Remote Workers:

Remote Collaboration: As more people work remotely, a task management tool facilitates collaboration and ensures remote teams stay organized and connected.
Flexible Scheduling: Helps remote workers manage their schedules, prioritize tasks, and maintain work-life balance.

*/
