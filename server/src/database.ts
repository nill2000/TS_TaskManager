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
  console.log("Getting Tasks  - Database");
  return { Message: "Get Tasks" };
};

export const addTask = async () => {
  console.log("Adding Task - Database");
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
