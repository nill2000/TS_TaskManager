import express, { Request, Response } from "express";
import { getTasks, addTask, deleteTask, updateTask } from "./database";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

//Obtains all tasks to show into task manager
app.get("/getTasks", async (req: Request, res: Response) => {
  const tasks = await getTasks();
  console.log(tasks);
  res.json(tasks);
});

//Adds a task to the task manager
app.post("/addTask", async (req: Request, res: Response) => {
  const { text } = req.body;
  console.log(text);
  const addedTask = addTask(text); //Function saves task to database
  res.json(addedTask);
});

//Edits a task
app.put("/updateTask", async (req: Request, res: Response) => {
  const updatedTask = updateTask();
  res.json(updatedTask);
});

//Deletes a task
app.delete("/deleteTask", async (req: Request, res: Response) => {
  const deletedTask = await deleteTask();
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
