import express, { Request, Response } from "express";
import { getTasks, addTask, deleteTask, updateTask } from "./database";
import { PrismaClient } from "../prisma/generated";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/getTasks", async (req, res) => {
  //   const tasks = await prisma.task.findMany();
  //   res.json(tasks);

  const tasks = await getTasks();
  res.json(tasks);
});

app.post("/addTask", async (req, res) => {
  //   const { text } = req.body;
  //   const task = await prisma.task.create({
  //     data: { text },
  //   });
  //   res.json(task);
  const addedTask = addTask();
  res.json(addedTask);
});

app.put("/updateTask", async (req, res) => {
  const updatedTask = updateTask();
  res.json(updatedTask);
});

app.delete("/deleteTask", async (req, res) => {
  const deletedTask = await deleteTask();
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
