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
            <FiFile /> {k} 
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

const BookMarkArea = () => {
  const { psuedoFS, currentPath } = usePsuedoFSContext();
  return (
    <div className={styles.bookmark_area}>{
      Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        if (psuedoFS.nodeType(`${currentPath}.${k}`) === 'file') {
          return <BookMark k={k} />
        }
      })
    }
    {
      Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        if (psuedoFS.nodeType(`${currentPath}.${k}`) === 'folder') {
          return <BookMark k={k} />
        }
      })
    }</div>
  )
}

export { BookMark, BookMarkArea };
