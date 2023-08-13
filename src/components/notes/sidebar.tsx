import { FiPlus } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { addNote, selectNotes, setCurrentNote } from "@/redux/notesSlice";

import styles from "@/styles/notes.module.scss";

const Sidebar = () => {
  const { notes } = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const onAddClick = () => {
    dispatch(addNote());

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement!.blur();
    }
  };

  const onSelectNote = (noteId: string) => {
    dispatch(setCurrentNote(noteId));
  };

  return (
    <div className={styles.sidebar_container}>
      {Object.keys(notes).map((noteId) => {
        return (
          <button
            onClick={() => onSelectNote(noteId)}
            className={styles.sidebar_note}
            key={noteId}
          >
            {notes[noteId].title.length > 0 ? notes[noteId].title : noteId}
          </button>
        );
      })}

      <button onClick={onAddClick} className={styles.sidebar_note}>
        <FiPlus />
      </button>
    </div>
  );
};

export default Sidebar;
