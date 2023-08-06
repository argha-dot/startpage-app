import { FormEvent, useState } from "react";
import { FiChevronRight, FiFolder } from "react-icons/fi"

import styles from "@/styles/bookmarks.module.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxAppHooks";
import { createFSNode, selectPsuedoFS } from "@/redux/psuedoFSSlice";

const BottomBar = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isFolder, setIsFolder] = useState(false)

  const dispatch = useAppDispatch()
  const { currentPath } = useAppSelector(selectPsuedoFS)

  const create = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch(createFSNode({ isFolder, currentPath, name, link }))

    setName("")
    setLink("")
    setIsFolder(false)
  }

  return <form className={styles.bottom_bar} onSubmit={e => create(e)}>
    <div className={styles.inputs}>
      <input
        aria-label="Name of the Bookmark"
        type="text"
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        value={name}
      />

      <input
        aria-label="Link"
        type="text"
        onChange={e => setLink(e.target.value)}
        value={link}
        disabled={isFolder}
        placeholder="Link"
      />
    </div>

    <button
      aria-label="Is Folder?"
      className={`${ styles.is_folder_button } ${isFolder ? styles.is_folder_selected : ""}`}
      onClick={e => { e.preventDefault(); setIsFolder(prev => !prev) }}
    >
       <FiFolder />
    </button>

    <button
      aria-label="Add New Bookmark"
      className={styles.submit_button}
    >
       <FiChevronRight />
    </button>
  </form>
}


export default BottomBar;
