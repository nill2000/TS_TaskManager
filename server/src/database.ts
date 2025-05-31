// import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../prisma/generated";

// const supabaseUrl: string = "https://rcmjriqpvljwivvkkscd.supabase.co";
// const supabaseKey: string | undefined = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey!);

const prisma = new PrismaClient();

const main = async () => {
  // run inside `async` function
  await prisma.$connect();
  console.log("Prisma Connection - Server");
};

export const getTasks = async () => {
  const allTasks = await prisma.task.findMany();
  console.log("Getting Tasks  - Database");
  return { Tasks: allTasks };
};

export const addTask = async (task: string) => {
  const createTask = await prisma.task.create({
    data: {
      text: task,
    },
  });
  console.log("Task added to db - db");
  return { Message: "Adding a Task" };
};

export const deleteTask = async () => {
  console.log("Deleting Task - Database");
  return { Message: "Deleting a Task" };
};

export const updateTask = async () => {
  console.log("Updating Task - Database");
  return { Message: "Updating a Task" };
};

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
