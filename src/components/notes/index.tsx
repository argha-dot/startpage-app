import styles from "@/styles/notes.module.scss";
import Notepad from "./notepad";
import Container, { ComponentContianerPropsI } from "../container";

export type NotesComponentProps = ComponentContianerPropsI & {
  noteId: string | undefined;
};

const NotesComponent = ({
  rowStart,
  rowSpan,
  colStart,
  colSpan,
  noteId,
  id,
}: NotesComponentProps) => {
  return (
    <Container
      id={id}
      minRow={3}
      minCol={3}
      colStart={colStart ?? 1}
      rowStart={rowStart ?? 1}
      rowSpan={colSpan ?? 1}
      colSpan={rowSpan ?? 1}
      className={styles.container}
      padding="0"
    >
      <Notepad noteId={noteId ?? ""} />
    </Container>
  );
};

export default NotesComponent;
