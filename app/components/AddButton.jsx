import Plus from "../icons/Plus";
import { useRef, useContext } from "react";
import colors from "../assets/colors.json";
import { NoteContext } from "../context/NoteContext";

const AddButton = () => {
  const startingPos = useRef(10);
  const { notes, setNotes } = useContext(NoteContext);

  const addNote = async () => {
    const id = await notes.reduce((total, curr) => {
      if (curr.id > total) {
        total = curr.id;
      }

      return total;
    }, 0);

    const payload = {
      id: id + 1,
      body: JSON.stringify(),
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current,
      }),
      colors: JSON.stringify(colors[0]),
    };

    startingPos.current += 10;
    setNotes((prevState) => [payload, ...prevState]);
  };

  return (
    <div
      onClick={addNote}
      className="h-10 w-10 hover:h-11 hover:w-11 bg-[#6b6b6b] flex justify-center items-center rounded-full cursor-pointer transition duration-300"
    >
      <Plus />
    </div>
  );
};

export default AddButton;
