import styles from "@/styles/bookmarks.module.scss";
import { FiFile, FiFolder } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS, setCurrentPath } from "@/redux/psuedoFSSlice";

const BookMark = ({ k }: { k: string }) => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);
  const dispatch = useAppDispatch();

  const handleOnFolderClick = () => dispatch(setCurrentPath(`${currentPath}.${k}`))

  return (
    <>
      {psuedoFS.nodeType(`${currentPath}.${k}`) === "file" ? (
        <a target="_blank" href={psuedoFS.getLink(`${currentPath}.${k}`)}>
          <div className={`${styles.book_file}`} key={k}>
            <FiFile /> {k} 
          </div>
        </a>
      ) : (
        <div 
          className={styles.book_folder}
          onClick={handleOnFolderClick}
        >
          <FiFolder /> {k}
        </div>
      )}
    </>
  );
}

const BookMarkArea = () => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);

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
