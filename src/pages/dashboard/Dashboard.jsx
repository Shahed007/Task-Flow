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
  Textarea,
} from "@material-tailwind/react";
import Container from "../../components/container/Container";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Dashboard = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("Low");
  // const Task = ({ task, onTaskMove }) => {
  //   const [, drag] = useDrag({
  //     type: "TASK",
  //     item: { id: task._id, priority: task.priority },
  //   });

  const handleOpen = () => setOpen(!open);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const date = form.date.value;
    const description = form.description.value;

    const res = await axios.post("http://localhost:5000/task", {
      title,
      date,
      description,
      priority: select,
      email: user?.email,
    });
    if (res.data.insertedId) {
      toast.success("Task added successfully");
      setOpen(false);
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

            <Button type="submit" size="md" className="bg-secondary">
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
