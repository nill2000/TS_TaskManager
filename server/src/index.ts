import express from "express";
import { PrismaClient } from "../prisma/generated";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const task = await prisma.task.create({
    data: { text },
  });
  res.json(task);
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
