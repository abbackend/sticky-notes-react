import { useContext } from "react";
import NoteCard from "@/app/components/NoteCard";
import Controls from "@/app/components/Controls";
import { NoteContext } from "@/app/context/NoteContext";

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
