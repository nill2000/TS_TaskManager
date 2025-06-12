import React, { useState, useEffect } from "react";
import Message from "./Message.tsx";
import Message2 from "./Message2.tsx";

export default function TaskBody() {
  //Matching schema of prisma orm
  type Task = {
    id: number;
    text: string;
    is_done: boolean;
    created_at: number;
  };

  //Controls the tasks to filter as an array and render
  const [tasks, setTasks] = useState<Task[]>([]);

  //Controls the tasks in the fill-in box
  const [newTask, setNewTask] = useState<string>("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  //Add task to list and db
  const addTask = async () => {
    // Check if empty; create an object of type Task
    if (newTask.trim() !== "") {
      //   const newTaskObj: Task = {
      //     id: null,
      //     text: newTask,
      //   };

      console.log(`Task from Fill in: ${newTask}`);
      console.log("Adding Task Request - Client");

      try {
        const addTaskUrl = "http://localhost:4000/addTask";
        const response = await fetch(addTaskUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTask }),
        });

        if (!response.ok) {
          throw new Error(`Response ${response.status}`);
        }
        const addedTask = await response.json();
        console.log("Added task sent from backend:");
        console.log(addedTask);

        //Adds the tasks to the array
        setTasks([...tasks, addedTask]);
      } catch (error) {
        console.error(error.message);
      }

      setNewTask("");
    }
  };

  //Function to delete Tasks
  const handleDelete = async (id: number): Promise<void> => {
    console.log("Making Delete Request - Client");
    const deleteTaskUrl = "http://localhost:4000/deleteTask";

    //DELETE request to backend
    try {
      const response = await fetch(deleteTaskUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error(`Response ${response.status}`);
      }
      const deletedTask = await response.json();
      console.log("Deleted task:");
      console.log(deletedTask.id);

      //Removes any item that matches false and re-renders array
      const filteredArray = tasks.filter((task, _) => {
        return task.id !== deletedTask.id;
      });
      setTasks(filteredArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = async (id: number, text: string) => {
    setTasks(
      //Cant use task.text[id] because react expects a new object not direct changes
      tasks.map((task) => {
        if (task.id === id) {
          //Keep the same object contents and change text
          return { ...task, text: text }; //Changes the specific content
        }
        return task; //Returns rest of the contents
      }),
    );
  };

  //Function to get tasks for useEffect
  const fetchTasks = async () => {
    console.log("Fetching Tasks Called - Client");
    const fetchTasksUrl = "http://localhost:4000/getTasks";

    try {
      const response = await fetch(fetchTasksUrl, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Response ${response.status}`);
      }

      const fetchedTasks = await response.json(); //Gives back an object with tasks as the key. That same "Task" contains an array of objects for each id and text. Try console.log() and see

      setTasks(fetchedTasks.Tasks);

      console.log(fetchedTasks.Tasks);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Use Effect Called - Client");
    fetchTasks();
    return () => {};
  }, []);

  return (
    //The Body of Container
    <main className="bg-[#ffffff]] m-0 flex max-h-[70vh] min-h-[25vh] min-w-[40vh] grow flex-col items-center justify-center rounded-xl border-2 border-black p-1">
      {/* Message Contents */}
      <div className="m-[1rem] h-full w-80 overflow-y-auto rounded-2xl border-2 border-black">
        {tasks.map((task, _) => {
          return (
            //Used this once testing is done
            <Message
              key={task.id}
              text={task.text}
              id={task.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            ></Message>

            //This component is being used to test
            // <Message2
            //   key={task.id}
            //   text={task.text}
            //   id={task.id}
            //   onDelete={handleDelete}
            //   onEdit={handleEdit}
            // ></Message2>
          );
        })}
      </div>

      {/* Bottom Portion for Input and Submitting */}
      <div className="mt-auto flex flex-col">
        <input
          className="rounded-xl border-2 border-black p-2"
          type="text"
          placeholder="Type Text Here"
          onChange={inputChange}
          value={newTask}
        />
        <button
          onClick={addTask}
          className="mt-1 cursor-pointer rounded-xl border-2 border-black p-2"
        >
          Submit Task
        </button>
      </div>
    </main>
  );
}
