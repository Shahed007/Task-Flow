// import React from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

import {
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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "@tanstack/react-query";

const Task = ({ task, onTaskMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-slate-200 ${isDragging ? "opacity-50" : ""}`}
    >
      <p className="text-xl font-semibold mt-2 p-3">{task.title}</p>
    </div>
  );
};

const Column = ({ title, tasks, status, onTaskMove }) => {
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
      className="smt-5 border border-gray-400 shadow-sm rounded-md"
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
        <Task key={task._id} task={task} onTaskMove={onTaskMove} />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Low");
  const [taskLoading, setTaskLoading] = useState(false);
  const uri = "http://localhost:5000";

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

  console.log(tasks);

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
      }
    } catch (err) {
      toast.error(err.message);
      setTaskLoading(false);
    }
  };
  return (
    <>
      <section className="my-12">
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
                  title="To Do"
                  tasks={tasks.filter((task) => task.status === "todo")}
                  status="todo"
                  onTaskMove={handleTaskMove}
                />
                <Column
                  title="Ongoing"
                  tasks={tasks.filter((task) => task.status === "ongoing")}
                  status="ongoing"
                  onTaskMove={handleTaskMove}
                />
                <Column
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
