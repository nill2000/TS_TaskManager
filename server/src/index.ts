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
  console.log("Reading Tasks... posting into ui");
  res.json(tasks);
});

//Adds a task to the task manager
app.post("/addTask", async (req: Request, res: Response) => {
  const { text } = req.body;
  console.log(text);
  const addedTask = await addTask(text); //Function saves task to database
  console.log("From index.ts:");
  console.log(addedTask);
  res.json(addedTask);
});

//Edits a task
app.put("/updateTask", async (req: Request, res: Response) => {
  const { id, text } = req.body;
  console.log("Id from frontend: ", id);
  console.log("Text from frontend: ", text);
  const updatedTask = await updateTask(id, text);
  res.json(updatedTask);
});

//Deletes a task
app.delete("/deleteTask", async (req: Request, res: Response) => {
  const { id } = req.body;
  const deletedTask = await deleteTask(id);
  console.log("Deleted Task: ", deletedTask);
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
