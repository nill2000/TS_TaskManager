export default function Message({ text, id, onDelete }: Props) {
  return (
    <div className="mb-2 flex flex-row justify-between overflow-hidden rounded-lg border-2 border-solid border-blue-300 p-2">
      <div>{text}</div>
      <button
        className="cursor-pointer rounded-xl border-2 border-solid border-black p-1 transition duration-200 ease-in hover:bg-gray-400"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

type Props = {
  text: string;
  id: number;
  onDelete: (id: number) => void;
};
