import { NoteContext } from "@/app/context/NoteContext";
import Trash from "@/app/icons/Trash";
import { useContext } from "react";

const DeleteButton = ({ noteId }) => {
  const { setNotes } = useContext(NoteContext);
  const handleDelete = async () => {
    setNotes((prevState) => {
      return prevState.filter((note) => note.id != noteId);
    });
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
