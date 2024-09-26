import { useContext } from "react";
import { NoteContext } from "@/app/context/NoteContext";

const Color = ({ color }) => {
  const { setNotes, selectedNote } = useContext(NoteContext);
  const changeColor = () => {
    if (selectedNote) {
      setNotes((prevState) => {
        return prevState.map((note) => {
          if (note.id === selectedNote.id) {
            note = { ...note, ...{ colors: JSON.stringify(color) } };
          }

          return note;
        });
      });
    }
  };
  return (
    <div
      style={{ backgroundColor: color.colorHeader }}
      onClick={changeColor}
      className="rounded-full h-10 w-10 hover:h-11 hover:w-11 cursor-pointer transition duration-300"
    ></div>
  );
};

export default Color;
