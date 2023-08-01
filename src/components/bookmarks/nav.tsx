import styles from "@/styles/bookmarks.module.scss"
import { usePsuedoFSContext } from "@/hooks/useThisContext";
import { FiChevronLeft, FiFolderPlus } from "react-icons/fi"
import PsuedoFS from "./psuedo_fs";

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

  // @ts-ignore
  const create = () => {
    psuedoFS.addLink(currentPath, "folder",  "localhost", "http://localhost:3000/")

    setPsuedoFS(prev => new PsuedoFS(prev.getFs()));
  }

  return <div className={styles.bottom_bar}>
    <button onClick={create}>
       <FiFolderPlus />
    </button>
    <input type="text" placeholder="name" />
  </div>
}

export { BottomBar, FSNav }
