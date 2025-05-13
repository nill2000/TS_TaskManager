import React, { useState } from "react";

export default function TaskBody() {
  type Task = {
    id: number;
    text: string;
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj: Task = {
        id: Date.now(),
        text: newTask,
      };

      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  return (
    //The Body of Container
    <main className="bg-[#ffffff]] m-0 flex max-h-[70vh] min-h-[25vh] min-w-[40vh] grow flex-col items-center justify-center rounded-xl border-2 border-black p-1">
      {/* Message Contents */}
      <div className="m-[1rem] h-full w-80 overflow-y-auto rounded-2xl border-2 border-black">
        {tasks.map((task, _) => {
          return (
            <div className="p-2" key={task.id}>
              {task.text}
            </div>
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
