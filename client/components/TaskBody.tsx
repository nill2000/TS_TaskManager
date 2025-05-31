import React, { useState, useEffect } from "react";
import Message from "./Message.tsx";

export default function TaskBody() {
  type Task = {
    id: number;
    text: string;
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
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
      };

      console.log(newTask);
      console.log("Adding Task Request - Client");
      const addTaskUrl = "http://localhost:4000/addTask";

      try {
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
        console.log(addedTask);
      } catch (error) {
        console.error(error.message);
      }

      // Takes the current items already in tasks and add the new task - newTaskObj
      setTasks([...tasks, newTaskObj]);
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
      });

      if (!response.ok) {
        throw new Error(`Response ${response.status}`);
      }
      const deletedTask = await response.json();
      console.log(deletedTask);
    } catch (error) {
      console.error(error.message);
    }

    //Removes any item that matches false and re-renders array
    const filteredArray = tasks.filter((task, _) => {
      return task.id !== id;
    });
    setTasks(filteredArray);
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
            <Message
              key={task.id}
              text={task.text}
              id={task.id}
              onDelete={handleDelete}
            ></Message>
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
