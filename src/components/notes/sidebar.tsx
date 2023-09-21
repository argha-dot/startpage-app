import {
  FaPlus,
  FaBars,
  FaTrashCan,
  FaCopy,
  FaFloppyDisk,
} from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import {
  addNote,
  deleteNote,
  selectNotes,
  setCurrentNote,
} from "@/redux/notesSlice";

import styles from "@/styles/notes.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const Browser = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<"browser" | "options">>;
}) => {
  const { notes, currentNote } = useAppSelector(selectNotes);
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
            className={`${styles.sidebar_note} ${
              noteId === currentNote ? styles.current_note : ""
            }`}
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
  const { notes, currentNote } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(notes[currentNote].content);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDeleteClick = () => {
    console.log("delete");
    dispatch(deleteNote(currentNote));
  };

  const handleDownload = () => {
    const a: HTMLLinkElement | null = document.getElementById(
      "a"
    ) as HTMLLinkElement;

    if (a) {
      const file = new Blob([notes[currentNote].content], {
        type: "text/plain",
      });
      a.href = URL.createObjectURL(file);
      a.setAttribute("download", `${notes[currentNote].title}.md`);
    }
  };

  return (
    <div className={styles.tools}>
      <button title={"Copy Note"} onClick={handleCopyClick}>
        <FaCopy />
      </button>

      <button title={"Copy Note"} onClick={handleDeleteClick}>
        <FaTrashCan />
      </button>

      <a onClick={handleDownload} href="" id="a">
        <FaFloppyDisk />
      </a>
    </div>
  );
};

const Sidebar = () => {
  const [mode, setMode] = useState<"browser" | "options">("options");
  const { currentNote } = useAppSelector(selectNotes);

  useEffect(() => {
    if (!currentNote) setMode("browser");
  }, [currentNote, mode]);

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
