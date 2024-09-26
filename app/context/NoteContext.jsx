import { createContext, useEffect, useState } from "react";
import Spinner from "@/app/icons/Spinner";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const init = async () => {
    const response = await JSON.parse(localStorage.getItem("notes"));
    if (response) {
      setNotes(response);
    }

    setLoading(false);
  };

  const contextData = { notes, setNotes, selectedNote, setSelectedNote };
  return (
    <NoteContext.Provider value={contextData}>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <Spinner size={100} />
        </div>
      ) : (
        children
      )}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
