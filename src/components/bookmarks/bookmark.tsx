import styles from "@/styles/bookmarks.module.scss";
import { usePsuedoFSContext } from "@/hooks/useThisContext";
import { FiFile, FiFolder } from "react-icons/fi";

const BookMark = ({ k }: { k: string }) => {
  const { psuedoFS, currentPath, setCurrentPath } = usePsuedoFSContext();
  return (
    <>
      {psuedoFS.nodeType(`${currentPath}.${k}`) === "file" ? (
        <a target="_blank" href={psuedoFS.getLink(`${currentPath}.${k}`)}>
          <div className={`${styles.book_file}`} key={k}>
            <p>
              <FiFile /> {k}
            </p>
          </div>
        </a>
      ) : (
        <div className={styles.book_folder} onClick={() => setCurrentPath(`${currentPath}.${k}`)}>
          <FiFolder /> {k}
        </div>
      )}
    </>
  );
}

export { BookMark };
