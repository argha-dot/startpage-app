import useStickyState from "@/hooks/useStickyState";
import styles from "@/styles/notes.module.scss";
import { FiCopy } from "react-icons/fi";

const Notepad = () => {
  const [note, setNote] = useStickyState(
    {
      title: "",
      content: "",
    },
    "note"
  );

  const handleCopyClick = () => {
    navigator.clipboard.writeText(note.content);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className={styles.notepad_container}>
      <div className={styles.header}>
        <input
          defaultValue={note.title}
          placeholder={"Enter a Title..."}
          onChange={(e) =>
            setNote((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
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
        onChange={(e) =>
          setNote((prev) => {
            return { ...prev, content: e.target.value };
          })
        }
        defaultValue={note.content}
        placeholder={"Write something"}
      ></textarea>
    </div>
  );
};

export default Notepad;
