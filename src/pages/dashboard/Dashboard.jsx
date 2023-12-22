import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, useQuery } from "@tanstack/react-query";
import {IoIosArrowDown} from "react-icons/io"

const uri = "http://localhost:5000";

const Task = ({ task, onTaskMove, refetch }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [select, setSelect] = useState("Low");
  const handleOpenUpdate = () => setOpenUpdate(!openUpdate);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    const from = e.target;
    const title = from.title.value;
    const description = from.description.value;
    const date = from.date.value;

    try {
      const res = await axios.put(`${uri}/task/${task._id}`, {
        title,
        date,
        description,
        priority: select,
      });
      if (res.data.modifiedCount) {
        refetch();
        toast.success("Task updated successfully");
        setOpenUpdate(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(`${uri}/task/${task._id}`);

    try {
      if (res.data.deletedCount) {
        toast.success("Task deleted successfully");
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div
        ref={drag}
        className={`bg-slate-200 my-2 ${isDragging ? "bg-primary" : ""}`}
      >
        <Accordion
          open={open}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4 group "
        >
          <AccordionHeader
            onClick={() => handleOpen()}
            className={`border-b-0 transition-colors ${
              open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
            }`}
          >
            <div className="flex items-center justify-between  w-full h-full gap-2">
              <div className="flex justify-between items-center w-full">
                {task.title}{" "}
                {task.status === "todo" ? (
                  <span className="uppercase text-sm text-purple-400">
                    {task.status}
                  </span>
                ) : (
                  ""
                )}
                {task.status === "ongoing" ? (
                  <span className="uppercase text-sm text-teal-300">
                    {task.status}
                  </span>
                ) : (
                  ""
                )}
                {task.status === "completed" ? (
                  <span className="uppercase text-sm text-green-500">
                    {task.status}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <IoIosArrowDown /> 
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            <p>{task.description}</p>
            <div className="mt-3 bg-gray-300 px-2 py-1 rounded-md flex justify-between items-center">
              <p>
                Priority:{" "}
                {task.priority ? (
                  <span className="text-sm">{task.priority}</span>
                ) : (
                  ""
                )}
              </p>
              <div className="flex items-center gap-4">
                <Button onClick={handleOpenUpdate} className="bg-primary">
                  Edit
                </Button>
                <Button onClick={handleDelete} className="bg-red-800">
                  Delete
                </Button>
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      <Dialog open={openUpdate} handler={handleOpenUpdate}>
        <DialogHeader>Update your task</DialogHeader>
        <form onSubmit={handleUpdate}>
          <DialogBody className="flex flex-col gap-4">
            <Input defaultValue={task.title} name="title" label="Title" />
            <input
              defaultValue={task.data}
              className="py-1 rounded-md px-1 border border-gray-700"
              type="date"
              name="date"
            ></input>
            <Select name="priority" label={task.priority}>
              <Option onClick={() => setSelect("Low")}>Low</Option>
              <Option onClick={() => setSelect("Moderate")}>Moderate</Option>
              <Option onClick={() => setSelect("High")}>High</Option>
            </Select>
            <Textarea
              defaultValue={task.description}
              name="description"
              label="Description"
            />
            <Button type="submit" size="md" className="bg-primary">
              Update Task
            </Button>
          </DialogBody>
        </form>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenUpdate}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

const Column = ({ title, tasks, status, onTaskMove, refetch }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onTaskMove(item.id, item.status, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      className="smt-5 border min-h-32 border-gray-400 shadow-sm rounded-md"
      ref={drop}
    >
      <div>
        <h1
          className={`text-2xl font-semibold p-3 bg-secondary uppercase text-white rounded-t-md text-center ${
            isActive ? "bg-yellow-300" : ""
          }`}
        >
          {title}
        </h1>
      </div>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onTaskMove={onTaskMove}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Low");
  const [taskLoading, setTaskLoading] = useState(false);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],

    queryFn: async () => {
      const res = await axios.get(`${uri}/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        {" "}
        <Spinner className="h-12 w-12" />
      </div>
    );

  const handleTaskMove = async (taskId, fromStatus, toStatus) => {
    try {
      const res = await axios.put(`${uri}/task/${taskId}`, {
        status: toStatus,
      });

      console.log(res);

      if (res.data.modifiedCount) {
        toast.success(`Task status updated successfully`);
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const description = form.description.value;

    setTaskLoading(true);

    try {
      const res = await axios.post(`${uri}/task`, {
        title,
        date,
        description,
        priority: select,
        email: user?.email,
        status: "todo",
      });
      if (res.data.insertedId) {
        toast.success("Task added successfully");
        setTaskLoading(false);
        setOpen(false);
        refetch();
      }
    } catch (err) {
      toast.error(err.message);
      setTaskLoading(false);
    }
  };
  return (
    <>
      <section className="my-12 md:h-screen h-full">
        <Container>
          <div className="mb-12">
            <Button onClick={handleOpen} className="bg-secondary" size="lg">
              New Task
            </Button>
          </div>

          <DndProvider backend={HTML5Backend}>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Column
                  refetch={refetch}
                  title="To Do"
                  tasks={tasks.filter((task) => task.status === "todo")}
                  status="todo"
                  onTaskMove={handleTaskMove}
                />
                <Column
                  refetch={refetch}
                  title="Ongoing"
                  tasks={tasks.filter((task) => task.status === "ongoing")}
                  status="ongoing"
                  onTaskMove={handleTaskMove}
                />
                <Column
                  refetch={refetch}
                  title="Completed"
                  tasks={tasks.filter((task) => task.status === "completed")}
                  status="completed"
                  onTaskMove={handleTaskMove}
                />
              </div>
            </div>
          </DndProvider>
        </Container>
      </section>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Create your new Task</DialogHeader>
        <form onSubmit={handleAddTask}>
          <DialogBody className="flex flex-col gap-6">
            <Input required name="title" label="Title" />
            <input
              className="py-1 rounded-md px-1 border border-gray-700"
              type="date"
              name="date"
              required
            ></input>
            <Select name="priority" label="Select Version">
              <Option onClick={() => setSelect("Low")}>Low</Option>
              <Option onClick={() => setSelect("Moderate")}>Moderate</Option>
              <Option onClick={() => setSelect("High")}>High</Option>
            </Select>
            <Textarea required name="description" label="Description" />

            <Button
              loading={taskLoading}
              type="submit"
              size="md"
              className="bg-secondary flex justify-center items-center"
            >
              Add Task
            </Button>
          </DialogBody>
        </form>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Dashboard;
