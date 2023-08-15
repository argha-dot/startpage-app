import styles from "@/styles/notes.module.scss";
import Sidebar from "./sidebar";
import Notepad from "./notepad";

const NotesComponent = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Notepad />
    </div>
  );
};

export default NotesComponent;
