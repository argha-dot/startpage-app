import styles from "@/styles/bookmarks.module.scss";
import { FiLink, FiFolder, FiTrash, FiEdit2, FiCopy } from "react-icons/fi";
import { selectMusic } from "@/redux/musicSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { selectPsuedoFS, setCurrentPath, deleteFSNode } from "@/redux/psuedoFSSlice";

interface BookMarkPropsI {
  k: string;
  nodeType: string
}

const BookMark = ({ k, nodeType }: BookMarkPropsI) => {
  const { psuedoFS, currentPath } = useAppSelector(selectPsuedoFS);
  const { playing } = useAppSelector(selectMusic)
  const dispatch = useAppDispatch();

  const handleOnFolderClick = () => dispatch(setCurrentPath(`${currentPath}.${k}`))
  const handleOnMoreClick = () => {
    console.log(nodeType)
    dispatch(deleteFSNode({ currentPath, name: k }))
  }

  const handleCopyClick = () => {
    if (nodeType === "file") {
      navigator.clipboard.writeText(psuedoFS.getLink(`${currentPath}.${k}`))
    }
  }

  return (
    <div className={styles.book_mark}>
      {psuedoFS.nodeType(`${currentPath}.${k}`) === "file" ? (
        <a
          style={{ textDecoration: "none" }}
          target={playing ? "_blank" : "_top"}
          href={psuedoFS.getLink(`${currentPath}.${k}`)}
        >
          <div className={`${styles.book_file}`} key={k}>
            <FiLink size="1.25em" />
            <p title={k}>{k.length > 10 ? `${k.slice(0, 7)}...` : k} </p>
          </div>
        </a>
      ) : (
        <button
          className={styles.book_folder}
          onClick={handleOnFolderClick}
        >
          <FiFolder />
          <p title={k}>{k.length > 10 ? `${k.slice(0, 7)}...` : k}</p>
        </button>
      )}

      <div className={styles.bookmark_more}>
        <button
          className={styles.bookmark_more_button}
          onClick={() => { handleOnMoreClick() }}
          title="Delete"
        > <FiTrash /> </button>

        <button
          className={styles.bookmark_more_button}
          disabled={true}
          title="Rename"
          onClick={() => { }}
        > <FiEdit2 /> </button>

        <button
          className={styles.bookmark_more_button}
          onClick={() => { handleCopyClick() }}
          title="Copy Link"
        > <FiCopy /> </button>
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
