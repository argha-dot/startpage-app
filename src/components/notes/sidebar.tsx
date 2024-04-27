import {
  FaPlus,
  FaBars,
  FaTrashCan,
  FaCopy,
  FaFloppyDisk,
} from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { addNote, selectNotes, setCurrentNote } from "@/redux/notesSlice";

import styles from "@/styles/notes.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

const Browser = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<"browser" | "options">>;
}) => {
  const { notes } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const onAddClick = () => {
    dispatch(addNote());

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setMode("options");
  };

  const onSelectNote = (noteId: string) => {
    dispatch(setCurrentNote(noteId));

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setMode("options");
  };

  return (
    <div>
      {Object.keys(notes).map((noteId) => {
        return (
          <button
            onClick={() => onSelectNote(noteId)}
            className={`${styles.sidebar_note}`}
            key={noteId}
          >
            <p>
              {notes[noteId].title.length > 0 ? notes[noteId].title : noteId}
            </p>
          </button>
        );
      })}

      <button onClick={onAddClick} className={styles.sidebar_note}>
        <FaPlus />
      </button>
    </div>
  );
};

const Options = () => {
  return (
    <div className={styles.tools}>
      <button title={"Copy Note"}>
        <FaCopy />
      </button>

      <button title={"Copy Note"}>
        <FaTrashCan />
      </button>

      <a href="" id="a">
        <FaFloppyDisk />
      </a>
    </div>
  );
};

const Sidebar = () => {
  const [mode, setMode] = useState<"browser" | "options">("options");

  const handleModeToggle = () => {
    setMode((prev) => (prev === "options" ? "browser" : "options"));
  };

  return (
    <div
      className={`${styles.sidebar_container} ${
        mode === "options" ? styles.options : styles.browser
      }`}
    >
      <div className={styles.toggle_button}>
        <button onClick={handleModeToggle}>
          <FaBars size={"1rem"} />
        </button>
      </div>
      {mode === "options" ? <Options /> : <Browser setMode={setMode} />}
    </div>
  );
};

export default Sidebar;
