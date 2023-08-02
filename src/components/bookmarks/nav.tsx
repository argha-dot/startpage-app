import { FormEvent, useState } from "react";

import PsuedoFS from "./psuedo_fs";
import { FiChevronLeft, FiChevronRight, FiFolder } from "react-icons/fi"
import { usePsuedoFSContext } from "@/hooks/useThisContext";

import styles from "@/styles/bookmarks.module.scss"

const FSNav = () => {
  const { currentPath, setCurrentPath } = usePsuedoFSContext();

  const back = () => {
    setCurrentPath(prev => prev.split(".").slice(0, -1).join("."))
  }

  const currentPathMod = (): string => {
    const ret = currentPath ? 
      `${currentPath.split(".").join("/")}` :
      "/"
    return ret.slice(-20)
  }

  return <div className={styles.nav}>
    <button onClick={back}>
      <FiChevronLeft />
    </button>

    <p>{currentPathMod()}</p>
  </div>
}

const BottomBar = () => {
  const { setPsuedoFS, psuedoFS, currentPath } = usePsuedoFSContext();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isFolder, setIsFolder] = useState(false)

  const create = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    if (isFolder) {
      psuedoFS.addLink(currentPath, "folder",  name)
      setName("")
      setIsFolder(false)
    } else {
      if (link.length > 0) {
        psuedoFS.addLink(currentPath, "file", name, link)
        setName("")
        setLink("")
      }
    }
    setPsuedoFS(prev => new PsuedoFS(prev.getFs()));
  }

  return <form className={styles.bottom_bar} onSubmit={e => create(e)}>
    <div className={styles.inputs}>
      <input
        type="text"
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        value={name}
      />

      <input
        type="text"
        onChange={e => setLink(e.target.value)}
        value={link}
        disabled={isFolder}
        placeholder="Link"
      />
    </div>
    <button
      className={`${ styles.is_folder_button } ${isFolder ? styles.is_folder_selected : ""}`}
      onClick={e => { e.preventDefault(); setIsFolder(prev => !prev) }}
    >
       <FiFolder />
    </button>

    <button
      className={styles.submit_button}
    >
       <FiChevronRight />
    </button>
  </form>
}

export { BottomBar, FSNav }
