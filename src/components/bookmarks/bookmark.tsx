import styles from "@/styles/bookmarks.module.scss";
import { FiLink, FiFolder, FiTrash, FiEdit2 } from "react-icons/fi";
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
      {psuedoFS.nodeType(`${currentPath}.${k}`) === "file" ? (
        <a style={{textDecoration: "none"}} target="_blank" href={psuedoFS.getLink(`${currentPath}.${k}`)}>
          <div className={`${styles.book_file}`} key={k}>
            <FiLink size="1.25em" /> { k.length > 10 ? `${k.slice(0, 7)}` : k} 
          </div>
        </a>
      ) : (
        <button 
          className={styles.book_folder}
          onClick={handleOnFolderClick}
        >
          <FiFolder /> { k.length > 10 ? `${k.slice(0, 7)}...` : k }
        </button>
      )}

      <div className={styles.bookmark_more}>
        <button
          className={styles.bookmark_more_button}
          onClick={() => {handleOnMoreClick()}}
        > <FiTrash /> </button>

        <button
          className={styles.bookmark_more_button}
          disabled={true}
          onClick={() => {handleOnMoreClick()}}
        > <FiEdit2 /> </button>
      </div>
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
