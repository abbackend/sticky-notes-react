import { useContext } from "react";
import NoteCard from "../components/NoteCard";
import Controls from "../components/Controls";
import { NoteContext } from "../context/NoteContext";

const NotePage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <>
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}

      <Controls />
    </>
  );
};

export default NotePage;
