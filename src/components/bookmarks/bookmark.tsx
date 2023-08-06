import styles from "@/styles/bookmarks.module.scss";
import { FiFile, FiFolder, FiTrash } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS, setCurrentPath, deleteFSNode } from "@/redux/psuedoFSSlice";

interface BookMarkPropsI {
 k: string;
 nodeType: string 
}

const BookMark = ({ k, nodeType }: BookMarkPropsI) => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);
  const dispatch = useAppDispatch();

  const handleOnFolderClick = () => dispatch(setCurrentPath(`${currentPath}.${k}`))
  const handleOnMoreClick = () => {
    console.log(nodeType)
    dispatch(deleteFSNode({ currentPath, name: k }))
  }

  return (
    <div className={styles.book_mark}>
      <button onClick={() => {handleOnMoreClick()}} className={styles.bookmark_more}> <FiTrash /> </button>

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
    </div>
  );
}

const BookMarkArea = () => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);

  return (
    <div className={styles.bookmark_area}>{
      Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        const nodeType = psuedoFS.nodeType(`${currentPath}.${k}`)
        if (nodeType === 'file') {
          return <BookMark k={k} nodeType={nodeType} />
        }
      })
    }
    {
      Object.keys(psuedoFS.ls(currentPath)).map((k) => {
        const nodeType = psuedoFS.nodeType(`${currentPath}.${k}`)
        if (nodeType === 'folder') {
          return <BookMark k={k} nodeType={nodeType} />
        }
      })
    }</div>
  )
}

export { BookMark, BookMarkArea };
