import { useState, useRef, useEffect, useContext } from "react";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";
import { autoGrow, setNewOffset, setZIndex, bodyParser } from "../utils.js";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const { setNotes, setSelectedNote } = useContext(NoteContext);

  let mouseStartPos = { x: 0, y: 0 };
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const keyUpTimer = useRef(null);

  const mouseDown = (event) => {
    if (event.target.classList.contains("card-header")) {
      setZIndex(cardRef.current);

      mouseStartPos.x = event.clientX;
      mouseStartPos.y = event.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      setSelectedNote(note);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const mouseMove = (event) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - event.clientX,
      y: mouseStartPos.y - event.clientY,
    };

    mouseStartPos.x = event.clientX;
    mouseStartPos.y = event.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    setNotes((prevState) => {
      return prevState.map((curr) => {
        if (curr.id === note.id) {
          curr = { ...curr, ...payload };
        }

        return curr;
      });
    });
    setSaving(false);
  };

  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, [textAreaRef, cardRef]);

  return (
    <div
      ref={cardRef}
      className="card w-96 bg-white border border-gray-200 rounded-lg shadow absolute cursor-pointer"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: colors.colorBody,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header flex justify-between items-center p-5 rounded-t-lg"
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <DeleteButton noteId={note.id} />
        {saving && (
          <div className="flex items-center">
            <Spinner color={colors.colorText} />
            <span className="ml-2" style={{ color: colors.colorText }}>
              Saving...
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <textarea
          ref={textAreaRef}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          className="bg-inherit border-none resize-none text-base h-full w-full focus:bg-inherit focus:outline-none"
          style={{ color: colors.colorText }}
          defaultValue={body}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
