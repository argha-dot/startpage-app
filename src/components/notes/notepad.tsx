import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { editNote, selectNotes } from "@/redux/notesSlice";
import styles from "@/styles/notes.module.scss";
import { ChangeEvent } from "react";
import { FiCopy } from "react-icons/fi";

const Notepad = () => {
  const { notes, currentNote } = useAppSelector(selectNotes);
  console.log(notes, currentNote);
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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(notes[currentNote].content);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className={styles.notepad_container}>
      <div className={styles.header}>
        <input
          value={notes[currentNote].title}
          placeholder={"Enter a Title..."}
          onChange={handleTitleChange}
          className={styles.heading}
          type="text"
        />

        <div className={styles.tools}>
          <button title={"Copy Note"} onClick={handleCopyClick}>
            <FiCopy />
          </button>
        </div>
      </div>

      <textarea
        rows={28}
        cols={60}
        className={styles.notepad_textarea}
        onChange={handleContentChange}
        value={notes[currentNote].content}
        placeholder={"Write something"}
      ></textarea>
    </div>
  );
};

export default Notepad;
