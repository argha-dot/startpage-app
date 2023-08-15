import { ChangeEvent } from "react";

import { editNote, selectNotes } from "@/redux/notesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";

import styles from "@/styles/notes.module.scss";

const Notepad = () => {
  const { notes, currentNote } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      editNote({
        title: e.target.value,
      })
    );
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editNote({ content: e.target.value }));
  };

  return (
    <div className={styles.notepad_container}>
      {notes[currentNote] ? (
        <>
          <div className={styles.header}>
            <input
              value={notes[currentNote] ? notes[currentNote].title : ""}
              placeholder={"Enter a Title..."}
              onChange={handleTitleChange}
              className={styles.heading}
              type="text"
            />
          </div>

          <textarea
            rows={28}
            cols={60}
            className={styles.notepad_textarea}
            onChange={handleContentChange}
            value={notes[currentNote] ? notes[currentNote].content : ""}
            placeholder={"Write something"}
          ></textarea>
        </>
      ) : (
        <p>choose a note</p>
      )}
    </div>
  );
};

export default Notepad;
