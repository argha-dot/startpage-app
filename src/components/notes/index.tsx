import styles from "@/styles/notes.module.scss";
// import Sidebar from "./sidebar";
import Notepad from "./notepad";

// <Sidebar />
const NotesComponent = () => {
  return (
    <div className={styles.container}>
      <Notepad />
    </div>
  );
};

export default NotesComponent;
