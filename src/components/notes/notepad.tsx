import { ChangeEvent, useState } from "react";

import { addNote, deleteNote, editNote, selectNotes } from "@/redux/notesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";

import styles from "@/styles/notes.module.scss";
import { FaFloppyDisk, FaGear, FaPlus, FaTrashCan } from "react-icons/fa6";

const Notepad = ({ noteId }: { noteId: string }) => {
  const [mode, setMode] = useState<"list" | "note">("note");
  const [currentNote, setCurrentNote] = useState(noteId);

  const { notes } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const onClickGear = () => {
    setMode((prev) => (prev === "list" ? "note" : "list"));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editNote({
        title: e.target.value,
        noteId: currentNote,
      }),
    );
  };

  const onAddClick = () => {
    dispatch(addNote());

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setMode("note");
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editNote({ content: e.target.value, noteId: currentNote }));
  };

  const onSelectNote = (noteId: string) => {
    setCurrentNote(noteId);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setMode("note");
  };

  const handleDownload = (note: string) => {
    const a: HTMLLinkElement | null = document.getElementById(
      "a",
    ) as HTMLLinkElement;

    if (a) {
      const file = new Blob([notes[note].content], {
        type: "text/plain",
      });
      a.href = URL.createObjectURL(file);
      a.setAttribute("download", `${notes[note].title}.md`);
    }
  };

  const handleDeleteClick = (note: string) => {
    console.log("delete");
    dispatch(deleteNote(note));
  };

  return mode === "list" ? (
    <>
      <div className={styles.note_container}>
        <div className={styles.header}>
          <div className={styles.heading_options}>
            <button onClick={onClickGear}>
              <FaGear />
            </button>
          </div>
        </div>

        <div className={`${styles.notepad_content} ${styles.notepad_browser}`}>
          <button onClick={onAddClick}>
            <FaPlus />
          </button>

          {Object.keys(notes).map((noteId) => {
            return (
              <div className={styles.notepad_content_info}>
                <p onClick={() => onSelectNote(noteId)}>
                  {`${notes[noteId]?.title} (${noteId})`}
                </p>

                <div className={styles.notepad_content_options}>
                  <button>
                    <a
                      style={{ color: "inherit" }}
                      href=""
                      id="a"
                      onClick={() => handleDownload(noteId)}
                    >
                      <FaFloppyDisk />
                    </a>
                  </button>

                  <button onClick={() => handleDeleteClick(noteId)}>
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className={styles.notepad_container}>
      <div className={styles.note_container}>
        <div className={styles.header}>
          <input
            value={notes[currentNote] ? notes[currentNote].title : ""}
            placeholder={"Enter a Title..."}
            onChange={handleTitleChange}
            className={styles.heading}
            type="text"
          />
          <div className={styles.heading_options}>
            <button onClick={onClickGear}>
              <FaGear />
            </button>
          </div>
        </div>

        {notes[currentNote] ? (
          <textarea
            rows={28}
            cols={60}
            className={styles.notepad_content}
            onChange={handleContentChange}
            value={notes[currentNote] ? notes[currentNote].content : ""}
            placeholder={"Write something"}
          ></textarea>
        ) : (
          <p>choose a note</p>
        )}
      </div>
    </div>
  );
};

export default Notepad;
