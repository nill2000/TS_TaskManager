import { useState } from "react";
export default function Message({ text, id, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempText, setTempText] = useState<string>(text);

  const startEditing = () => {
    setIsEditing(true);
    setTempText(text);
  };

  const saveEdit = async () => {
    setIsEditing(false);
    onEdit(id, tempText);

    //Make POST request to backend to update database
    try {
      console.log("Starting Update Request - Backend");
      const response = await fetch("http://localhost:4000/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        //Use tempText because thats the new text. Using "text" is the old text.
        body: JSON.stringify({ id: id, text: tempText }),
      });

      if (!response.ok) {
        throw new Error(`Response ${response.status}`);
      }

      const updatedTask = await response.json();
      console.log("Updated the task - FRONTEND");
      console.log(updatedTask);
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="mb-2 flex flex-row justify-between overflow-hidden rounded-lg border-2 border-solid border-blue-300 p-2">
      {/* Using tempText because cant change state since text is from parent */}
      <input
        type="text"
        value={tempText}
        onChange={(e) => setTempText(e.target.value)}
      />
      <div>
        <button
          className="mr-1 cursor-pointer rounded-xl border-2 border-solid border-black p-1 transition duration-200 ease-in hover:bg-gray-400"
          onClick={cancelEdit}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer rounded-xl border-2 border-solid border-black p-1 transition duration-200 ease-in hover:bg-gray-400"
          onClick={saveEdit}
        >
          Save
        </button>
      </div>
    </div>
  ) : (
    <div className="mb-2 flex flex-row justify-between overflow-hidden rounded-lg border-2 border-solid border-blue-300 p-2">
      <div>{text}</div>
      <div>
        <button
          className="mr-1 cursor-pointer rounded-xl border-2 border-solid border-black p-1 transition duration-200 ease-in hover:bg-gray-400"
          onClick={startEditing}
        >
          Edit
        </button>
        <button
          className="cursor-pointer rounded-xl border-2 border-solid border-black p-1 transition duration-200 ease-in hover:bg-gray-400"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

type Props = {
  text: string;
  id: number;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};
